import { TabBase, TabProps } from './Tab';
import { TabItem, TabItemProps } from './Tab.Item';
import { TabBar } from './TabBar';

export const Tab = Object.assign(TabBase, {
    Item: TabItem,
    Bar: TabBar,
});

export type { TabProps, TabItemProps };
