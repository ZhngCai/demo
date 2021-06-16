import { FC, useEffect, useState } from 'react'
// import { navigateTo } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { getPageParams } from '../../utils/router'
import storage from '../../utils/storage'
import { HTTPCollectorGet, HTTPGridLayout, HTTPSurveyGet } from '../../service'
import OSInfoList from './info_list'
import OSContent from './content'


interface ISessionJsonProp {
  jwt: string;
  user: {
    id: string;
    name?: string;
    emaill?: String;
    avatar?: string;
    locale?: string;
  };
}

const OSIndex: FC = () => {
  const [isShow, setIsShow] = useState(false);
  let jwt: string = "",
    collector_id: string = "";
  let jwt_param = getPageParams().jwt,
    collector_id_param = getPageParams().collector_id;


  useEffect(() => {
    handleStorage();
    getHttp();
  }, []);

  const handleStorage = () => {
    if (jwt_param && collector_id_param) {
      jwt = jwt_param;
      collector_id = collector_id_param;
    } else {
      // history.push("/error");
    }

    const sessionJson: ISessionJsonProp = {
      jwt: jwt,
      user: {
        id: collector_id,
      },
    };
    storage.set("collectorId", collector_id);
    storage.set("session", JSON.stringify(sessionJson));
  }

  const getHttp = () => {
    HTTPCollectorGet().then((resp) => {
      storage.set("surveyId", resp.survey_id);
      HTTPSurveyGet(resp.survey_id).then((Sresp) => {
        document.title = Sresp.name;
      });
      HTTPGridLayout(resp.survey_id).then((resp2) => {
        storage.set("layoutId", String(resp2.id));
        setIsShow(true);
      });
    });
  };

  return (
    <View className='index'>
      {
        isShow &&
        <>
          <OSInfoList></OSInfoList>
          <OSContent></OSContent>
        </>
      }
    </View>
  )
}

export default OSIndex;