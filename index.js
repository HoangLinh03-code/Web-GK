// Khai bao DOM
const searchBtn = document.querySelector("#search-btn")
const searchModal = document.querySelector("#search-modal")
const modal_close = document.querySelector('.btn-close')
const modal_contain = document.querySelector('.modal-content')
// Su kien bat tim kiem
searchBtn.addEventListener("click", function() {
    searchModal.classList.add("d-block")
})
// bam vao nut X
modal_close.addEventListener("click", function(){
    searchModal.classList.remove("d-block")
})

// bam ra ngoai modal se dong lai
searchModal.addEventListener('click',function(){
    searchModal.classList.remove('d-block')
})
// Khi bam vao se dung viec dong modal lai
modal_contain.addEventListener('click', function(event){
    event.stopPropagation()
})


//slide show anh
let slideIndex = 0;

    function showSlides() {
        const slides = document.querySelectorAll(".mySlides");
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("d-block");
            slides[i].classList.add("d-none"); // không show ảnh
        }
        slideIndex++;
        if (slideIndex > slides.length) { // quay lại slide 1 nếu đã đến ảnh cuối
            slideIndex = 1;
        }
        slides[slideIndex - 1].classList.remove("d-none"); 
        slides[slideIndex - 1].classList.add("d-block"); // show slide hiện tại
        setTimeout(showSlides, 2000); // Để thời gian slide chạy mỗi 2s
    }
    showSlides();



//Dynamic search
// Hàm để cập nhật đề xuất, làm nổi bật từ khóa và ẩn/hiện nội dung
function updateContent() {
    const searchInput = document.getElementById('searchInput').value;
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchResultsParagraph = document.getElementById('searchResultsParagraph');

    // Xóa bỏ các đề xuất trước đó và ẩn nội dung
    searchSuggestions.innerHTML = '';
    searchResultsParagraph.style.display = 'none';

    if (searchInput.trim() !== '') {
        displaySuggestions();
        displayContent();
    }
}

// Hàm để hiển thị đề xuất
function displaySuggestions() {
    const searchInput = document.getElementById('searchInput').value;
    const searchSuggestions = document.getElementById('searchSuggestions');

    const suggestions = [
        'flexbox',
        'grid',
        'JavaScript',
        'apple',
        'Localisation and Translation on the Web',
        'Our comprehensive guide to CSS flexbox layout. This complete guide explains everything about flexbox, focusing on all the different possible properties for the parent element (the flex container) and the child elements (the flex items). It also includes history, demos, patterns, and a browser support javascript.',
        'Comparing Node JavaScript to JavaScript in the Browser',
        'Our comprehensive guide to CSS grid, focusing on all the settings both for the grid parent container and the grid child elements.',
        'Responsible JavaScript',
        'Four techniques are explored on accomplishing a full page background image that conforms to our exceptions: no white space, scales as needed, retains aspect ratio, centered, and more.',
        'JavaScript Operator Lookup',
        'that Node JavaScript is a great way to write server-side code and capitalize on your JavaScript experience ... can get pretty far writing JavaScript UI without being asynchronous JavaScript geniuses.'
    ];

    const matchingSuggestions = suggestions.filter(suggestion =>
        suggestion.includes(searchInput)
    );

    matchingSuggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item')
        listItem.innerHTML = highlightKeyword(suggestion, searchInput);
        searchSuggestions.appendChild(listItem);
    });
}

// Hàm để làm nổi bật từ khóa trong văn bản
function highlightKeyword(text, keyword) {
    return text.replace(
        new RegExp(`(${keyword})`, 'ig'),
        (_, match) => `<span class="highlight">${match}</span>`
    );
}

// Hàm để hiển thị nội dung
function displayContent() {
    const searchInput = document.getElementById('searchInput').value;
    const searchResultsParagraph = document.getElementById('searchResultsParagraph');
    
    // Lặp qua từng mục đề xuất và ẩn/hiện dựa trên từ khóa
    const contentItems = searchResultsParagraph.querySelectorAll('.list-group > li');
    contentItems.forEach(item => {
        const heading = item.querySelector('h2').textContent;
        const paragraph = item.querySelector('p').textContent;

        // Làm nổi bật từ khóa trong tiêu đề và đoạn văn mà không làm thay đổi nội dung thực tế
        const highlightedHeading = highlightKeyword(heading, searchInput);
        const highlightedParagraph = highlightKeyword(paragraph, searchInput);


        const lowercasedHeading = heading.toLowerCase();
        const lowercasedParagraph = paragraph.toLowerCase();
        // Hiển thị mục với từ khóa được làm nổi bật nếu từ khóa mà không trùng với từ khóa trong nội dung thì sẽ không hiện
        if(lowercasedHeading.includes(searchInput)||lowercasedParagraph.includes(searchInput)){
            item.innerHTML = `
            <h2>${highlightedHeading}</h2>
            <p>${highlightedParagraph}</p>
        `;
            item.style.display = 'block'; 
        }else{
            item.style.display = 'none'
        }
        
    });

    // Hiển thị nội dung nếu có các mục phù hợp
    const visibleItems = Array.from(contentItems).some(item => item.style.display !== 'none');
    if (visibleItems) {
        searchResultsParagraph.style.display = 'block';
    }
}

