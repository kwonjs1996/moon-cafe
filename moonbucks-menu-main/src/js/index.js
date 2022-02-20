// 요구사항 구현을 위한 전략

//TODO 메뉴 추가
// - [ ] 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
// - [ ] 추가되는 메뉴의 아래 마크업은  <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다. 
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [ ] 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴수정하는 모달창이 뜬다.
// - [ ] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.
        

//TODO 메뉴 삭제
    // - [ ] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
    // - [ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.

const $ = (selector) => document.querySelector(selector);

function App(){
    //form태그가 자동으로 전송되는걸 막아준다
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    const addMenuname = () => {
      if ($("#espresso-menu-name").value === ""){
        alert("값을 입력해주세요.");
        return;
      }
     
        const espressoMenuName = $("#espresso-menu-name").value;
        const menuItemTemplate = (espressoMenuName)=> {
        return`
          <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
          <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
          수정
          </button>
          <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
          삭제
          </button>
      </li>`;
        }
      $("#espresso-menu-list").insertAdjacentHTML(
        "beforeend", menuItemTemplate(espressoMenuName)
        );
        updateMenuCount();
        $("#espresso-menu-name").value = "";
      }


    
    const updateMenuCount = () => {
      const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`
    };

    $("#espresso-menu-list").addEventListener("click", (e) => {
      //<li>태그로 추가되는 것들에게 이Event를 넣기 위해서 상위태그에 '위임'하는
      //방식으로 적용한다
      if (e.target.classList.contains("menu-edit-button")){
        const $menuName = e.target.closest("li").querySelector(".menu-name")
        const updatedMenuNme = prompt(
          "메뉴명을 수정하세요",
           $menuName.innerText
           //$menuName 만 입력했을 경우 [object HTMLSpanElement] 값이 나온다
           //그래서 innerText를 사용한다 정도로 이해
           );
        $menuName.innerText = updatedMenuNme;
      }

      if(e.target.classList.contains("menu-remove-button")){
        if (confirm("정말 삭제하시겠습니까?")){
            e.target.closest("li").remove();
            // qurryselector 를 사용하지 않는 이유는 li 태그 전부를
            //삭제 해야 하기 때문
            updateMenuCount();

        }
     
      }
      
    });



    



    //메뉴의 이름을 입력받는건
   $("#espresso-menu-name").addEventListener("keypress", (e) =>{
     if(e.key !== "Enter"){
       return
     }
     

       addMenuname(e);
    });

    $("#espresso-menu-submit-button").addEventListener("click", (e)=>{
      addMenuname(e);
    });


    
    
     
    
    }


App();
















