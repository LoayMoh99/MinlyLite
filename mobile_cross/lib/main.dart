import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:photo_view/photo_view.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Image/Video Viewer',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MediaViewerScreen(),
    );
  }
}

class MediaViewerScreen extends StatefulWidget {
  @override
  _MediaViewerScreenState createState() => _MediaViewerScreenState();
}

class _MediaViewerScreenState extends State<MediaViewerScreen> {
  VideoPlayerController? _videoPlayerController;
  bool _isVideo = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    _videoPlayerController?.dispose();
    super.dispose();
  }

  void _playVideo(String url) {
    _videoPlayerController = VideoPlayerController.network(url)
      ..initialize().then((_) {
        setState(() {
          _isVideo = true;
          _videoPlayerController?.play();
        });
      });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Image/Video Viewer'),
      ),
      body: Center(
        child: _isVideo
            ? _videoPlayerController?.value.isInitialized ?? false
                ? AspectRatio(
                    aspectRatio: _videoPlayerController!.value.aspectRatio,
                    child: VideoPlayer(_videoPlayerController!),
                  )
                : CircularProgressIndicator()
            : PhotoView(
                imageProvider: NetworkImage(
                    'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200'), // Change to your image URL
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            if (_isVideo) {
              _videoPlayerController?.pause();
              _isVideo = false;
            } else {
              _playVideo(
                  'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4'); // Change to your video URL
            }
          });
        },
        child: Icon(_isVideo ? Icons.image : Icons.videocam),
      ),
    );
  }
}
