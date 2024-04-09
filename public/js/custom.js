$(function(){

    $('#delModal').on('show.bs.modal', function(e){
        const button = $(e.relatedTarget);
        const char = button.data('char');
        const delnum = button.data('delnum');
        $('#delnum').val(delnum);
        $('#char').val(char);
    })

    $('#delete-btn').click(function(){
        const delpass = $('#password_del').val();
        const delnum = $('#delnum').val();
        
        $.ajax({
            url:'/del',
            type:'post',
            data:{delpass:delpass, delnum:delnum},
            success:function(data){
                const rs = parseInt(data);
                if(rs>0){
                    alert('삭제했습니다 🎉🎉');
                    location.href='/';
                }else{
                    alert('비밀번호 오류, 다시 확인해주세요.');
                    $('#password_del').val('');
                    $('#password_del').focus();
                }
            },error:function(xhr){
                alert('삭제하는데 에러 발생!📢📢\n 다시 시도하던지 운영자에게 문의 바람');
                $('#password_del').val('');
                $('#password_del').focus();
            }
        });
    })
});