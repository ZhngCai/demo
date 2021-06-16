import { FC } from "react";
import OSMapBar from "./bar";
import OSMapCircle from "./circle";
import OSMapRing from "./ring";
import OSMapColumn from "./column";
import { IOSMapProps, TMapBarSeriesDataType, labelType, TMapCircleDataType, TMapRadarDataType, TMapStackedDataType, TRaderLabel } from "./types";
import OSMapRadar from "./radar";
import OSMapStackedHorBar from "./stacked_hor_bar";
import OSMapStackedColBar from "./stacked_col_bar";

const OSMap: FC<IOSMapProps> = ({
  mapType,
  label,
  seriesData,
}) => {
  return (
    <>
      {
        (mapType == 'circle' && <OSMapCircle seriesData={seriesData as TMapCircleDataType}></OSMapCircle>)
        ||
        (mapType == 'ring' && <OSMapRing seriesData={seriesData as TMapCircleDataType}></OSMapRing>)
        ||
        (mapType == 'column' && <OSMapColumn label={label as labelType} seriesData={seriesData as TMapBarSeriesDataType}></OSMapColumn>)
        ||
        (mapType == 'bar' && <OSMapBar label={label as labelType} seriesData={seriesData as TMapBarSeriesDataType}></OSMapBar>)
        ||
        (mapType == 'radar' && <OSMapRadar label={label as TRaderLabel} seriesData={seriesData as TMapRadarDataType}></OSMapRadar>)
        ||
        (mapType == 'stackedHorBar' && <OSMapStackedHorBar label={label as labelType} seriesData={seriesData as TMapStackedDataType}></OSMapStackedHorBar>)
        ||
        (mapType == 'stackedColBar' && <OSMapStackedColBar label={label as labelType} seriesData={seriesData as TMapStackedDataType}></OSMapStackedColBar>)
      }
    </>
  );
};

export default OSMap;
