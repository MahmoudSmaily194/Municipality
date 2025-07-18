import type { NewsItemType } from "./NewsItemType"

export type NewsStoreType={
    newsItem:NewsItemType;
    setNewsItem:(newsItem:NewsItemType)=>void;
}