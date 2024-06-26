import { useDispatchers, useInstance, useModule } from '@sigi/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ListDemoModule } from './index.module';
import { ListDemoApi } from './index.api';
import useInterval from '@/_custom/hooks/useInterval';
import LoadingPre from '@/components/LoadingPre';

type ListDemoProps = {
  title: string;
};

const ListDemo: React.FC<ListDemoProps> = (props) => {
  const history = useHistory();

  const [{ queryParams, dataList, tempData }, listDemoDispatcher] = useModule(ListDemoModule, {
    selector: (state) => ({
      dataList: state.dataList,
      queryParams: state.queryParams,
      tempData: state.tempData,
    }),
    dependencies: [],
  });
  // const dispatcher = useDispatchers(ListDemoModule);

  // const ListDemoService = useInstance(ListDemoApi);
  // console.log(ListDemoService.getPageList({}).then((list) => dispatcher.setState({ dataList: list })));

  useEffect(() => {
    listDemoDispatcher.getTempData(123);
    listDemoDispatcher.getPageListWatch();
    listDemoDispatcher.setQueryParams({ name: 'ListDemo' });
  }, []);

  useInterval(() => {
    // getPageListWatch 随 queryParams.name 重新请求
    listDemoDispatcher.setQueryParams({ name: 'ListDemo' + Math.random() });
  }, 3000);

  return (
    <div data-component="ListDemo">
      <LoadingPre />
      <div className="dotted-hr" />
      {JSON.stringify(tempData)}
      <br />
      {JSON.stringify(dataList)}
      <br />
      {JSON.stringify(queryParams)}
    </div>
  );
};

export default ListDemo;
