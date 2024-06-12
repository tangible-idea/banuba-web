function selectItem(element)  {
    // 모든 항목에서 'selected' 클래스를 제거
    document.querySelectorAll('.popup-tips__content-item').forEach(item => {
      item.classList.remove('selected');
    });
  
    // 클릭한 항목에 'selected' 클래스 추가
    element.classList.add('selected');
  }