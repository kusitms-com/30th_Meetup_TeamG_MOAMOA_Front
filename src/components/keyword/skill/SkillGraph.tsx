import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import * as S from './SkillGraph.Style';
import { useTheme } from 'styled-components';
import { getGraph } from '@/api/Graph';
import { SkillData } from '@/types/SkillData';

export const SkillGraph = () => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<SkillData[]>([]);

  useEffect(() => {
    const fetchGraphData = async () => {
      const data = await getGraph();
      if (data) {
        setChartData(data.map((skill: any) => ({
          name: skill.keyword,
          value: skill.count,
          percent: skill.percent,
        })));
      }
    };
    fetchGraphData();
  }, []);

  const getChartColor = (percent: number) => {
    if (percent > 20) return theme.colors.blue200;
    if (percent > 10) return theme.colors.blue100;
    if (percent > 5) return theme.colors.yellow200;
    if (percent > 2) return theme.colors.yellow50;
    return theme.colors.gray25;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name, fill }: any) => {
    const RADIAN = Math.PI / 180;

    const lineStartRadius = outerRadius;
    const xLineStart = cx + lineStartRadius * Math.cos(-midAngle * RADIAN);
    const yLineStart = cy + lineStartRadius * Math.sin(-midAngle * RADIAN);

    const lineEndRadius = outerRadius + 15;
    const xLineEnd = cx + lineEndRadius * Math.cos(-midAngle * RADIAN);
    const yLineEnd = cy + lineEndRadius * Math.sin(-midAngle * RADIAN);

    const textOffset = 10;
    const xText = xLineEnd + (xLineEnd > cx ? textOffset : -textOffset);
    const yText = yLineEnd;
    const textAnchor = xLineEnd > cx ? "start" : "end";

    return (
      <>
        <line
          x1={xLineStart}
          y1={yLineStart}
          x2={xLineEnd}
          y2={yLineEnd}
          stroke={fill}
          strokeWidth={2}
        />
        <text
          x={xText}
          y={yText}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            fill: theme.colors.gray700,
          }}
        >
          {name}
        </text>
      </>
    );
  };

  return (
    <S.GraphContainer>
      <PieChart width={S.CHART_STYLES.width} height={S.CHART_STYLES.height}>
        <Pie
          data={chartData}
          innerRadius={S.CHART_STYLES.innerRadius}
          outerRadius={S.CHART_STYLES.outerRadius}
          cornerRadius={S.CHART_STYLES.cornerRadius}
          paddingAngle={S.CHART_STYLES.paddingAngle}
          {...S.CHART_STYLES.pieProps}
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getChartColor(entry.percent)}
            />
          ))}
        </Pie>
      </PieChart>
    </S.GraphContainer>
  );
};