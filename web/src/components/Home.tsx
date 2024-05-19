import React, { useState, useEffect } from "react";
import Search from "./Search/Search";
import MediaCard from "./MediaCard/MediaCard";
import InfiniteScroll from "react-infinite-scroll-component";
import IMedia from "../types/media.type";
import { getPublicMedias } from "../services/media.service";

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [medias, setMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    searchMedias(); // first render
  }, []);

  const searchMedias = async (title: string = "") => {
    const params = `?pageNo=${page}` + (title.length > 0 ? `&search=${title}` : '');
    getPublicMedias(params).then((response) => {
      const responseMedias: any[] = response.data.data;
      // check for hasMore condition 
      if (responseMedias.length === 0) {
        setHasMore(false);
        return;
      }

      setMedias(medias.concat(
        ...responseMedias
      ));
      setPage(page + 1);

    })
  };

  return (
    <div>
      <Search onSearch={searchMedias} />
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
        next={searchMedias}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
      />
    </div >
  );
};

export default Home;
