import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

export interface PaginatedListProps<T> {
  data: T[];
  loading: boolean;
  fetchData: () => void;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  keyExtractor: (item: T, index: number) => string;
  itemsPerPage?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ItemSeparatorComponent?: React.ComponentType<any>;
  onEndReachedThreshold?: number;
}

export function PaginatedList<T>({
  data,
  loading,
  fetchData,
  renderItem,
  keyExtractor,
  itemsPerPage = 8,
  contentContainerStyle,
  ListEmptyComponent,
  ListHeaderComponent,
  ItemSeparatorComponent,
  onEndReachedThreshold = 0.2,
}: PaginatedListProps<T>) {
  const [visibleData, setVisibleData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [momentum, setMomentum] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setVisibleData(data.slice(0, itemsPerPage));
    setPage(1);
  }, [data, itemsPerPage]);

  const loadMore = () => {
    const nextPage = page + 1;
    const end = nextPage * itemsPerPage;
    if (data.length > visibleData.length) {
      setVisibleData(data.slice(0, end));
      setPage(nextPage);
    }
  };

  const ItemSeparator = () => <View style={{ height: 16 }} />;

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={visibleData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={contentContainerStyle}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        if (!momentum) {
          loadMore();
          setMomentum(true);
        }
      }}
      onEndReachedThreshold={onEndReachedThreshold}
      onMomentumScrollBegin={() => setMomentum(false)}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 16 },
});
