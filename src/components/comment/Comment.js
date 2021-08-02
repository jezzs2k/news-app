import React from 'react';
import { FlatList } from 'react-native';


import { RenderItem } from './CommentItem';

export const Comments = ({ listHeaderComp, comments }) => {
    return <FlatList
        data={comments}
        keyExtractor={(item, index) => item?.id ?? `${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComp}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyboardDismissMode={'on-drag'}
        keyboardShouldPersistTaps={'handled'}
    />
};

