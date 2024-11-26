import { useState, useEffect } from 'react';
import { RecordBottomSheet } from '@components/common/bottomSheet/RecordBottomSheet';
import { KeywordHeader } from '@/components/keyword/header/KeywordHeader';
import { SideBar } from '@/components/common/sideBar/SideBar';
import { KeywordSkill } from '@/components/keyword/keywordSkill/KeywordSkill';
import { SkillList } from '@/components/keyword/skill/SkillList';
import { SkillGraph } from '@/components/keyword/skill/SkillGraph';
import { getGraph } from '@/api/Graph';
import { Empty } from '@/components/common/empty/Empty';
import * as S from './KeywordPage.Style';
export const KeywordPage = () => {
  const [openBottom, setOpenBottom] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [currentTabBar, setCurrentTabBar] = useState('역량 키워드');
  const [selectedKeyword, setSelectedKeyword] = useState<string | undefined>(undefined);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 그래프 데이터를 가져오는 로직 추가
    const fetchGraphData = async () => {
      const data = await getGraph(); // getGraph 함수는 API 호출을 통해 데이터를 가져오는 함수
      if (data) {
        setChartData(data);
      }
    };
    fetchGraphData();
  }, []);

  const toggleBottomSheet = () => {
    setOpenBottom((prev) => !prev);
  };

  const toggleSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  const handleTabBar = (item: string) => {
    setCurrentTabBar(item);
  };

  const handleClickSkillList = () => {
    setCurrentTabBar('역량 키워드');
  };

  return (
    <div>
      <KeywordHeader
        currentTabBar={currentTabBar}
        onClickTabBar={handleTabBar}
        onClickSideBar={toggleSideBar}
      />
      {currentTabBar === '역량 키워드' ? (
        <KeywordSkill
          onClick={toggleBottomSheet}
          selectedKeyword={selectedKeyword}
          setSelectedKeyword={setSelectedKeyword}
        />
      ) : (
        <>
          <S.Container $isEmpty={chartData.length === 0}>
            {chartData.length > 0 ? (
              <S.Content>
                <SkillGraph />
                <SkillList onClick={handleClickSkillList} setSelectedKeyword={setSelectedKeyword} />
              </S.Content>
            ) : (
              <S.EmptyContainer>
                <Empty />
              </S.EmptyContainer>
            )}
          </S.Container>
        </>
      )
      }
      {openBottom && <RecordBottomSheet onClick={toggleBottomSheet} />}
      {openSideBar && <SideBar onClick={toggleSideBar} />}
    </div >
  );
};
