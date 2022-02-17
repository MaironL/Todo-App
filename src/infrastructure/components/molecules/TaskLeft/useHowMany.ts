const useHowMany = () => {
  const howMany = (tasksLeft: { todoTask: string; id: string; isCheck: boolean }[]) => {
    const itemsLeft = tasksLeft.filter((item) => item.isCheck === false);
    return itemsLeft.length;
  };

  return { howMany };
};

export default useHowMany;
