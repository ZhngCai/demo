
const group = {
  age_verify: <
    IFakeServerWorker<{ value: string; }>
    >{
      params: ['value'],
      work(data) {
        return {
          result: new Date().getFullYear() - Number(data.value),
        };
      }
    },
}
