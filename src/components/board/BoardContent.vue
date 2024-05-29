<template>
    <div>
        <form>
            <div class="HeaderAndTitle">
			<BoardSelectOption/> <input class="cupet_board_title" name="cupet_board_title" required="required" placeholder="게시물 제목을 입력해주세요"> <br/>
			</div>
			<ckeditor class="cupet_board_content" id="cupet_board_content" name="cupet_board_content" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
            <button>수정</button>
            <button>삭제</button>

        </form>
    </div>
</template>
<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
	import BoardSelectOption from "@/components/board/BoardSelectOption.vue";


export default {
	name: "MainPage",
	components: {
		BoardSelectOption,
	},

	data(){
		return {
			editor: ClassicEditor,
 //               editorData: '<p>게시물 내용을 입력해주세요.</p>', //나중에 db에서 초기값 가져와서 넣을 부분
                editorConfig: {
					placeholder : "게시물 내용을 입력해주세요"
                    // The configuration of the editor.
				}
		}
	}


};

</script>
<style>
.cupet_board_title {
	width: 100%; /* CKEditor가 전체 너비를 사용하도록 설정 */
    max-width: 600px; /* 제목과 같은 최대 너비 설정 */
}

.cupet_board_content {
	width: 100%; /* 원하는 크기 비율로 설정 */
    max-width: 600px; /* 예시로 최대 너비를 600px로 설정 */
    box-sizing: border-box; /* 패딩과 테두리를 포함하여 너비를 계산 */
}

.HeaderAndTitle {
	display: flex;
  flex-direction: row;
}
    
</style>