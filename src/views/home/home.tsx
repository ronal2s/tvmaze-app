import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import SearchInput from "../../components/searchInput";
import ShowsController from "../../controllers/showsController";
import CONSTANTS from "../../helpers/constants";
import TVShow from "../../models/tvShow";
import ShowList from "./content/showList";

let timer: any;
function HomeView() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    from: 0,
    to: 10,
    page: 0,
    loading: false,
  });
  const [showsFiltered, setShowsFiltered] = useState<TVShow[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!pagination.loading) {
      fetchData();
    }
  }, [pagination.page]);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchData();
    }, 500);
  }, [searchText]);

  const searchData = async () => {
    ShowsController.search(searchText).then((data) => {
      setShowsFiltered(data);
    });
  };

  const fetchData = async () => {
    setPagination({ ...pagination, loading: true });
    ShowsController.fetch({
      page: pagination.page,
      from: pagination.from,
      to: pagination.to,
      refresh: false,
    }).then((results) => {
      setShows([...shows, ...results]);
      setPagination({ ...pagination, loading: false });
    });
  };

  const onEndReached = async (event?: any, fixedPage?: number) => {
    if (pagination.loading) return;
    const nextTo = pagination.to + 10;
    const nextFrom = pagination.to;
    setPagination({ ...pagination, loading: true });
    const newData = await ShowsController.fetch({
      page: fixedPage || pagination.page,
      from: nextFrom,
      to: nextTo,
      refresh: false,
    });
    const nextPage = newData.length == 0;

    setShows([...shows, ...newData]);
    setPagination({
      from: nextPage ? 0 : nextFrom,
      to: nextPage ? 10 : nextTo,
      page: nextPage ? pagination.page + 1 : pagination.page,
      loading: false,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <SearchInput value={searchText} onChange={setSearchText} />
      </SafeAreaView>
      <ShowList
        shows={showsFiltered.length ? showsFiltered : shows}
        onEndReached={onEndReached}
        loading={pagination.loading}
      />
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.COLORS.DARK_GRAY,
    flex: 1,
  },
});

export default HomeView;
