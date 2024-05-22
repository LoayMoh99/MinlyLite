import React, { useState, useEffect } from "react";
import Search from "../components/Search/Search";
import MediaCard from "../components/MediaCard/MediaCard";
import InfiniteScroll from "react-infinite-scroll-component";
import IMedia from "../types/media.type";
import { getPublicMedias } from "../services/media.service";

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [medias, setMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    // TODO : figure out why search not working as expected
    setLoading(true);
    searchMedias(search);
  }, [search]);

  const searchMedias = async (searchText: string = '') => {
    let params = `?pageNo=${page}`;
    let currMedias = medias;
    if (searchText.length > 0) { // for first time
      setMedias([]);
      setPage(1);
      params = `?pageNo=${1}`;
      currMedias = [];
    }
    setHasMore(true);
    params += (searchText.length > 0 ? `&search=${searchText}` : '');
    console.log("searching medias with params: ", params);
    const response = await getPublicMedias(params);

    const responseMedias: any[] = response.data.data.data;
    setLoading(false);
    // check for hasMore condition 
    if (responseMedias.length === 0) {
      setHasMore(false);
      return;
    }
    console.log(responseMedias);

    setMedias([...currMedias, ...responseMedias]);
    setPage(page + 1);
  };
  return (
    <div>
      <Search onSearch={searchMedias} />
      {
        loading ? <div className="empty">
          <h2>Loading...</h2>
        </div>
          :
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
      }
    </div >
  );
};

export default Home;
