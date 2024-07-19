import styles from './styles/DesktopDescriptionTabs.module.scss'
import { TabWithAllContents, TopAwardsListItem } from './DescriptionTabsV2'
import { TabList } from './TabList'
import { TabPanes } from './TabPanes'

type DesktopTabsProps = {
  desktopOnlyTabs: TabWithAllContents[]
  handleDrawerClick: (category: string) => void
  activeCategory: string | null
  topAwards?: TopAwardsListItem[]
}

// TODO Clean my subcomponents
export const DesktopDescriptionTabs = ({
  desktopOnlyTabs,
  handleDrawerClick,
  activeCategory,
  topAwards,
}: DesktopTabsProps) => {
  const desktopTabTitles = desktopOnlyTabs.map((t) => t.title)

  return (
    // TODO don't use HiddenTab, it's old.
    <div className={`${styles.Wrapper} HiddenTab`}>
      <TabList
        desktopTabTitles={desktopTabTitles}
        activeCategory={activeCategory}
        handleDrawerClick={handleDrawerClick}
        topAwards={topAwards}
      />

      <TabPanes
        desktopOnlyTabs={desktopOnlyTabs}
        activeCategory={activeCategory}
        topAwards={topAwards}
      />
    </div>
  )
}
