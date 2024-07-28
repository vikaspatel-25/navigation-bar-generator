// Assigning initial values to variables
let tabs = 3;
let width = "400";
let height = "40";
let label = ["TEST", "ODI", "T20i", "Tab 4", "Tab 5", "Tab 6", "Tab 7"];
let fontSize = "14";
let backgroundColor = "#0F0B18";
let activeTabColor = "#FFFFFF";
let labelColor = "#FFFFFF";
let activeTabLabelColor = "#000000";
let tabWidth = 100 / tabs;
let currentLabel;

// Getting references of fields
let tabNumberInput = document.getElementById('numberSelect');
let tabNameInput = document.getElementById('tabNameInput');
let heightInput = document.getElementById('heightInput');
let widthInput = document.getElementById('widthInput');
let fontSizeInput = document.getElementById('fontSizeInput');

let backgroundColorPicker = document.getElementById('backgroundColorPicker');
let backgroundColorPickerInput = document.getElementById('colorInput');

let activeTabColorPicker = document.getElementById('activeTabColorPicker');
let activeTabColorInput = document.getElementById('activeTabColorInput');

let labelColorPicker = document.getElementById('labelColorPicker');
let labelColorPickerInput = document.getElementById('labelColorInput');

let activeLabelColorPicker = document.getElementById('activeLabelColorPicker');
let activeLabelColorInput = document.getElementById('activeLabelColorInput');

// Getting references of buttons
let labelButton = document.getElementById('labelButton');
let heightButton = document.getElementById('heightButton');
let widthButton = document.getElementById('widthButton');
let fontButton = document.getElementById('fontButton');
let backgroundColorButton = document.getElementById('backgroundColorButton');
let activeTabColorButton = document.getElementById('activeTabColorButton');
let labelColorButton = document.getElementById('labelColorButton');
let activeLabelColorButton = document.getElementById('activeLabelColorButton');
let resetButton = document.getElementById('resetButton');
let submitButton = document.getElementById('submitButton');
let tabNumber = document.getElementById('numberSelect');

// Getting references of UI elements
let navBarArea = document.getElementById('navBarArea');
let navBarContainer = document.getElementById('navBarContainer');
let navBar = document.getElementById('navBar');
let labelNumberDisplay = document.getElementById('labelNumberDisplay');

let htmlCode = document.getElementById('htmlCode');
let jsCode = document.getElementById('jsCode');
let htmlCopyButton = document.getElementById('copyBarHtml');
let jsCopyButton = document.getElementById('copyBarJs');
let tabSelect = document.getElementById('tabSelect');

// Linking input field and color pickers
function isValidHex(color) {
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return hexRegex.test(color);
}

// Link color picker with text input and validate input
function linkColorPicker(colorPickerId, colorInputId) {
    const colorPicker = document.getElementById(colorPickerId);
    const colorInput = document.getElementById(colorInputId);

    // Sync color picker to text input
    colorPicker.addEventListener('input', function() {
        colorInput.value = colorPicker.value;
    });

    // Sync text input to color picker
    colorInput.addEventListener('input', function() {
        if (isValidHex(colorInput.value)) {
            colorPicker.value = colorInput.value;
        }
    });

    // Sync color picker to text input
    resetButton.addEventListener('click', function() {
        colorInput.value = colorPicker.value;
    });
}

// Link all color pickers and text inputs
linkColorPicker('backgroundColorPicker', 'colorInput');
linkColorPicker('activeTabColorPicker', 'activeTabColorInput');
linkColorPicker('labelColorPicker', 'labelColorInput');
linkColorPicker('activeLabelColorPicker', 'activeLabelColorInput');

// Creating nav bar from the default values initially
function initNavBar() {
    navBarContainer.innerHTML = `
        <div id="navBarContainer" style="width: ${width}px; height: ${height}px; display: flex; align-items: center; justify-content: center;">
            <div id="navBar" class="nav-bar" style="height: 60%; width: 85%; border-radius: 99px; padding-top: 3px; background-color: ${backgroundColor}; display: flex; align-items: center; justify-content: space-between; padding: 1.5%;"></div>
        </div>
    `;

    let navBar = document.getElementById('navBar');

    for (let i = 0; i < tabs; i++) {
        const tab = document.createElement('div');
        tab.id = `tab${i + 1}`;
        tab.className = 'n-tab';
        tab.setAttribute('onClick', 'handleTabClick(event)');   
            tab.style = `
            height: 100%;
            width: ${tabWidth}%;
            border-radius: 99px;
            font-family: 'Roboto', sans-serif;
            color: ${labelColor};
            font-size: ${fontSize}px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            cursor: pointer;
            overflow: hidden;
            margin-left:2px;
            margin-right:2px;
            
        `;

        if (i === 0) {
            tab.style.backgroundColor = `${activeTabColor}`;
            tab.style.color = `${activeTabLabelColor}`;
        }

        tab.textContent = `${label[i]}`;
        navBar.appendChild(tab);
    }

    htmlCode.innerText = navBarContainer.innerHTML;
}

initNavBar();

function initTabLabelCount(){
    tabSelect.innerHTML =``;

    for(let i=0;i<tabs;i++){
        const option = document.createElement('option');
        option.id = `option${i + 1}`;
        option.value = `${i + 1}`;
        option.innerText = `${i+1}`;
        tabSelect.appendChild(option);
 }
 currentLabel = tabSelect.value;
}
initTabLabelCount();

function handleTabClick(event) {
    let allTabs = Array.from(document.getElementsByClassName('n-tab'));

    // reset the styles for all tabs
    allTabs.forEach(tab => {
        tab.style.backgroundColor = `${backgroundColor}`;
        tab.style.color = `${labelColor}`;
        tab.style.overflow = "hidden";
    });

    // retrieve the clicked tab and set its styles
    let tabClicked = event.target;
    tabClicked.style.backgroundColor = `${activeTabColor}`;
    tabClicked.style.color = `${activeTabLabelColor}`;
    
    let  tabClickedId = event.target.getAttribute('id');
    console.log(tabClickedId);
    return tabClickedId;
};

function updateJsCode(){
    jsCode.innerText = `function handleTabClick(event) {
    let allTabs = Array.from(document.getElementsByClassName('n-tab'));

    // reset the styles for all tabs
    allTabs.forEach(tab => {
        tab.style.backgroundColor = '${backgroundColor}';
        tab.style.color = '${labelColor}';
       
    });

    // retrieve the clicked tab and set its styles
    let tabClicked = event.target;
    tabClicked.style.backgroundColor = '${activeTabColor}';
    tabClicked.style.color = '${activeTabLabelColor}';
    
    let  tabClickedId = event.target.getAttribute('id');
    console.log(tabClickedId);
    return tabClickedId;
};`
}
updateJsCode();
    

tabSelect.addEventListener('input',()=>{
    currentLabel = tabSelect.value;
    labelNumberDisplay.innerText = `Enter Label for Tab ${currentLabel}`;
})

tabNumber.addEventListener('input', () => {
    tabs = tabNumber.value;
    tabWidth = 100 / tabs;
    initNavBar();
    initTabLabelCount();
    
});


labelButton.addEventListener('click', () => {
    
    if (currentLabel <= tabs) {
        if (tabNameInput.value !== "") {
            label[currentLabel-1] = tabNameInput.value;
            tabNameInput.value = "";
            currentLabel++;
            tabSelect.value =`${currentLabel}`;
        }
        if (currentLabel <= tabs) {
            labelNumberDisplay.innerText = `Enter Label for Tab ${currentLabel}`;
        } else {
            labelNumberDisplay.innerText = `Reset to enter again`;
        }
    }
    initNavBar();
   
});

heightButton.addEventListener('click', () => {
    if (heightInput.value > 100) heightInput.value = 100;
    if (heightInput.value < 20) heightInput.value = 20;
    height = heightInput.value;
    initNavBar();
});

widthButton.addEventListener('click', () => {
    if (widthInput.value > 1000) widthInput.value = 1000;
    if (widthInput.value < 200) widthInput.value = 200;
    width = widthInput.value;
    initNavBar();
});

fontButton.addEventListener('click', () => {
    if (fontSizeInput.value > 20) fontSizeInput.value = 20;
    fontSize = fontSizeInput.value;
    initNavBar();
});

backgroundColorPicker.addEventListener('input', () => {
    if (!isValidHex(backgroundColorPickerInput.value)) {
        backgroundColorPickerInput.value = backgroundColorPicker.value;
    }
    backgroundColor = backgroundColorPicker.value;
    initNavBar();
    updateJsCode();

});

backgroundColorButton.addEventListener('click', () => {
    if (!isValidHex(backgroundColorPickerInput.value)) {
        backgroundColorPickerInput.value = backgroundColorPicker.value;
    }
    backgroundColor = backgroundColorPicker.value;
    initNavBar();
    updateJsCode();

});

activeLabelColorButton.addEventListener('click', () => {
    if (!isValidHex(activeLabelColorInput.value)) {
        activeLabelColorInput.value = activeLabelColorPicker.value;
    }
    activeTabLabelColor = activeLabelColorPicker.value;
    initNavBar();
    updateJsCode();

});

activeLabelColorPicker.addEventListener('input', () => {
    if (!isValidHex(activeLabelColorInput.value)) {
        activeLabelColorInput.value = activeLabelColorPicker.value;
    }
    activeTabLabelColor = activeLabelColorPicker.value;
    initNavBar();
    updateJsCode();

});

labelColorButton.addEventListener('click', () => {
    if (!isValidHex(labelColorPickerInput.value)) {
        labelColorPickerInput.value = labelColorPicker.value;
    }
    labelColor = labelColorPicker.value;
    initNavBar();
    updateJsCode();

});

labelColorPicker.addEventListener('input', () => {
    if (!isValidHex(labelColorPickerInput.value)) {
        labelColorPickerInput.value = labelColorPicker.value;
    }
    labelColor = labelColorPicker.value;
    initNavBar();
    updateJsCode();

});

activeTabColorButton.addEventListener('click', () => {
    if (!isValidHex(activeTabColorInput.value)) {
        activeTabColorInput.value = activeTabColorPicker.value;
    }
    activeTabColor = activeTabColorPicker.value;
    initNavBar();
    updateJsCode();

});

activeTabColorPicker.addEventListener('input', () => {
    if (!isValidHex(activeTabColorInput.value)) {
        activeTabColorInput.value = activeTabColorPicker.value;
    }
    activeTabColor = activeTabColorPicker.value;
    initNavBar();
    updateJsCode();

});

resetButton.addEventListener('click', () => {
    tabs = 3;
    width = "400";
    height = "40";
    label = ["TEST", "ODI", "T20i", "Tab 4", "Tab 5", "Tab 6", "Tab 7"];
    fontSize = "14";
    backgroundColor = "#0F0B18";
    activeTabColor = "#FFFFFF";
    labelColor = "#FFFFFF";
    activeTabLabelColor = "#000000";
    tabWidth = 100 / tabs;

    backgroundColorPicker.value = backgroundColor;
    activeLabelColorPicker.value = activeTabLabelColor;
    labelColorPicker.value = labelColor;
    activeTabColorPicker.value = activeTabColor;

    backgroundColorPickerInput.value = backgroundColor;
    activeLabelColorInput.value = activeTabLabelColor;
    labelColorPickerInput.value = labelColor;
    activeTabColorInput.value = activeTabColor;

    fontSizeInput.value = fontSize;
    widthInput.value = width;
    heightInput.value = height;

    tabNumber.value = '3';
    i = 0;
    tabNameInput.value = "";
    labelNumberDisplay.innerText = `Enter Label for Tab ${i + 1}`;
    tabSelect.value = `1`;
    currentLabel = `1`;
    initNavBar();
    updateJsCode();

});

submitButton.addEventListener('click', () => {
    activeTabColor = activeTabColorPicker.value;
    labelColor = labelColorPicker.value;
    activeTabLabelColor = activeLabelColorPicker.value;
    backgroundColor = backgroundColorPicker.value;

    fontSize = fontSizeInput.value;
    width = widthInput.value;
    height = heightInput.value;
    if (tabNameInput.value !== "") {
        label[currentLabel-1] = tabNameInput.value;
    }
    tabNameInput.value = "";
    
    
    tabSelect.value = `1`;
    currentLabel = tabSelect.value;
    labelNumberDisplay.innerText = `Enter Label for Tab ${tabSelect.value}`;
    initNavBar();
    updateJsCode();

});


htmlCopyButton.addEventListener('click', () => {
    let htmlCodeToCopy = htmlCode.innerText;
    navigator.clipboard.writeText(htmlCodeToCopy);
    htmlCopyButton.innerText = `Code Copied!`;
    setTimeout(() => {
        htmlCopyButton.innerText = `Copy code - HTML/CSS`;
    }, 1000);
});

jsCopyButton.addEventListener('click', () => {
    let jsCodeToCopy = jsCode.innerText;
    navigator.clipboard.writeText(jsCodeToCopy);
    jsCopyButton.innerText = `Code Copied!`;
    setTimeout(() => {
        jsCopyButton.innerText = `Copy code - js`;
    }, 1000);
});
