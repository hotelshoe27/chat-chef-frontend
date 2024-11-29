import React, { useState } from "react";
import PrevButton from "../components/PrevButton";
import InfoInput from "../components/InfoInput";
import AddButton from "../components/AddButton";
import Button from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Info = ({sendIngredientList}) => {
  // logic
  const history = useNavigate();

  const [ingredientList, setIngredientList] = useState([]); // 사용자가 입력할 재료 목록

  const addIngredient = () => {
    console.log("재료 추가하기");
    const id = Date.now();
    const newItem = {
      id: id,
      label: `ingredient${id}`,
      text: '재료명',
      value: ''
    }
    setIngredientList([...ingredientList, newItem]);   
  };

  const handleNext = () => {
    // 입력값이 있는 배열
    const filterDataList = ingredientList.filter((item) => item.value.trim() !== '');
    if (filterDataList.length > 0) {
      // 재료 입력 값이 있는 경우


      // 데이터 부모에게 전송
      sendIngredientList(ingredientList.map((item) => ({...item, value: item.value.trim()})));
      history('/chat');
      return;
    }
    // 재료 입력 값이 없는 경우
    alert('재료를 최소 1개 이상 입력해주세요.');
  };

  const handleRemove = (id) => {
    console.log('id: ', id);
    setIngredientList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (selectedItem) => {
    setIngredientList((prev) =>
      prev.map((item) => (item.id === selectedItem.id ?
        selectedItem : item))
  );
  };

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-104"></i>
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* TODO:Title 컴포넌트 */}
        <Title mainTitle={'당신의 냉장고를 알려주세요'} subTitle={''}/>
        {/* // TODO:Title 컴포넌트 */}

        {/* START:form 영역 */}
        <div className="mt-20 overflow-auto">
          <form>
            {/* START:input 영역 */}
            <div>
              {ingredientList.map((item) => (
                <InfoInput key={item.id} content={item} onChange={handleChange} onRemove={handleRemove} />
              ))}

            </div>
            {/* END:input 영역 */}
          </form>
        </div>
        {/* END:form 영역 */}
        {/* START:Add button 영역 */}
        <AddButton onClick={addIngredient} />
        {/* END:Add button 영역 */}
        {/* START:Button 영역 */}
        <Button text="Next" color="bg-chef-green-500" onClick={handleNext} />
        {/* END:Button 영역 */}
      </div>
    </div>
  );
};

export default Info;
