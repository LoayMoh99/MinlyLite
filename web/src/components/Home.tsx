import React, { useState, useEffect } from "react";
import Search from "./Search/Search";
import MediaCard from "./MediaCard/MediaCard";
import InfiniteScroll from "react-infinite-scroll-component";
import IMedia from "../types/media.type";

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [medias, setMovies] = useState<IMedia[]>([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title: string = "") => {
    // TODO add api call to get movies
    setPage(page + 1);

    // check for hasMore condition 

    if (page > 5) {
      setHasMore(false);
      return;
    }

    setMovies(medias.concat(
      [
        {
          _id: "66489b224e0ca2a4ed67ec79",
          title: "Video 2",
          mediaUrl: "https://firebasestorage.googleapis.com/v0/b/minlylite.appspot.com/o/videos%2F856787-hd_1920_1080_30fps.mp4?alt=media&token=d7bf7fcb-6a85-4c32-9fec-879f2e460678",
          type: "video",
          like: 0,
          likesCount: 10,
          dislikesCount: 5,
        },
        {
          _id: "66489b224e0ca2a4ed67ec22",
          title: "Image 2",
          mediaUrl: "https://firebasestorage.googleapis.com/v0/b/minlylite.appspot.com/o/videos%2FLoayGrad.jpg?alt=media&token=23149427-3309-4a01-a029-606612d6057f",
          type: "image",
          like: 0,
          likesCount: 0,
          dislikesCount: 0,
        },
        {
          _id: "66489b224e0ca2a4ed67ec78",
          title: "Video 2",
          mediaUrl: "https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4",
          type: "video",
          like: 0,
          likesCount: 0,
          dislikesCount: 3,
        },
        {
          _id: "66489b224e0ca2a4ed67ec23",
          title: "Image 2",
          mediaUrl: "https://source.unsplash.com/user/c_v_r/600x600",
          type: "image",
          like: 1,
          likesCount: 3,
          dislikesCount: 0,
        },
        {
          _id: "66489b224e0ca2a4ed67ec28",
          title: "Image 2",
          mediaUrl: "https://source.unsplash.com/user/c_v_r/500x500",
          type: "image",
          like: -1,
          likesCount: 0,
          dislikesCount: 4,
        },
        {
          _id: "66489b224e0ca2a4ed67ec42",
          title: "Image 2",
          mediaUrl: "https://source.unsplash.com/user/c_v_r/400x400",
          type: "image",
          like: -1,
          likesCount: 0,
          dislikesCount: 4,
        },
        {
          _id: "66489b224e0ca2a4ef67ec22",
          title: "Image 2",
          mediaUrl: "https://source.unsplash.com/user/c_v_r/300x300",
          type: "image",
          like: 1,
          likesCount: 10,
          dislikesCount: 4,
        },
      ]
    ));
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div>
      <Search onSearch={searchMovies} />
      <InfiniteScroll
        dataLength={medias.length}
        children={medias?.length > 0 ? (
          <div className="container">
            {medias.map((media: IMedia) => (
              <MediaCard {...media} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No medias found</h2>
          </div>
        )}
        next={searchMovies}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
      />
    </div >
  );
};

export default Home;
