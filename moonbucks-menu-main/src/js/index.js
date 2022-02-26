// 오늘 얻은 인사이트
// 이벤트 위임을 어떻게 할 수 있는지 알앗따
// 요구사항을 전략적으로 접근, 세세하게 나누는게 중요하다
// DOM 요소를 $를 써서 변수 처럼 사용 할 수 있다.


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

const store = {
  setLocalStorage(menu) {
      localStorage.setItem("menu",JSON.stringify(menu));
  },
  getLocalStorage() {
      return JSON.parse(localStorage.getItem("menu"));
  },
}

function App(){
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  this.menu = {
    espresso : [],
    prappuccino : [],
    blended : [],
    teavana : [],
    desert : []
  };
  this.currentCategory = "espresso"
  this.init =  () => {
    if (store.getLocalStorage()){
      this.menu = store.getLocalStorage();
    }
    render();
  };

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
        this.menu[this.currentCategory].push({ name : espressoMenuName });
        store.setLocalStorage(this.menu);
        render();
        $("#espresso-menu-name").value = "";
      }
      const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId
        const $menuName = e.target.closest("li").querySelector(".menu-name")
        const updatedMenuName = prompt(
          "메뉴명을 수정하세요",
           $menuName.innerText
           //$menuName 만 입력했을 경우 [object HTMLSpanElement] 값이 나온다
           //그래서 innerText를 사용한다 정도로 이해
           );
        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        $menuName.innerText = updatedMenuName;
      }


    
    const updateMenuCount = () => {
      const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`
    };
    const render = () => {
      const template = this.menu[this.currentCategory].map((item, index) => {
        return`
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${item.name}</span>
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
      })
      .join("")
      
    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
    }

    const removeMenuName = (e) => {
      if (confirm("정말 삭제하시겠습니까?")){
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu[this.currentCategory].splice(menuId, 1);
        store.setLocalStorage(this.menu);
        e.target.closest("li").remove();
        // qurryselector 를 사용하지 않는 이유는 li 태그 전부를
        //삭제 해야 하기 때문
        updateMenuCount();
      }
    }

    $("#espresso-menu-list").addEventListener("click", (e) => {
      //<li>태그로 추가되는 것들에게 이Event를 넣기 위해서 상위태그에 '위임'하는
      //방식으로 적용한다
      if (e.target.classList.contains("menu-edit-button")){
        updateMenuName(e);
      }

      if(e.target.classList.contains("menu-remove-button")){
        removeMenuName(e);
     
      }
      
    });

    //메뉴의 이름을 입력받는건
   $("#espresso-menu-name").addEventListener("keypress", (e) =>{
     if(e.key !== "Enter"){
       return
     }
     

       addMenuname();
    });

    $("#espresso-menu-submit-button").addEventListener("click", addMenuname);
    
    $("nav").addEventListener("click", (e) =>{
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
      if(isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      }
    });
    

    }


    const app = new App();
    app.init();
    //App();

//TODO localstorage Read & Write
// [ ] [localStorage]에 데이터를 저장한다. 
// [ ]  [localstorage]에 있는 데이터를 읽어온다.

//TODO 카테고리별 메뉴판 관리
// [ ] 에스프레소 메뉴판 관리
// [ ] 프라푸치노 메뉴판 관리
// [ ] 블렌디드 메뉴판 관리
// [ ] 디저트 메뉴판 관리

//TODO 페이지 접근시 최초 데이터 Reead & Rendering
// [ ] 페이지에 최초로 로딩 할 때 localStorage에 에스프레소 메뉴를 읽어온다
// [ ] 에스프레소 메뉴를 페이지에 그려준다
// TOODO 품절 상태 관리
// [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out calss를
// [ ] 추가하여 상태를 변경한다.
// [ ] 품절 버튼을 추가한다.
// [ ] 품절 버튼을 클릭하면 localStorage 에 상태값이 저장된다.
// [ ] 클릭 이벤트에서 가장 가까운 li태그의 class속성 값에 sold-out을 추가한다.














