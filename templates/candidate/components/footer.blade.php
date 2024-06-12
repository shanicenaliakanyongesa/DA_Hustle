        </div>
    </div>
</section>
<script src="{{ asset('assets/js/jquery.js') }}"></script>
<script src="{{ asset('assets/js/multi-select-tag.js') }}"></script>
<script>
    new MultiSelectTag('technical_skills')
    new MultiSelectTag('soft_skills')
    new MultiSelectTag('languages')

</script>
<script>
    $(document).ready(function() {
        // Dismiss alert when close button is clicked
        $(".da-alert .da-close").on("click", function() {
            $(this).parent().hide();
        });
    });
</script>
<script>
    function previewImage(event){
        const reader = new FileReader();
        const imagePreview = document.getElementById('profile-img-preview');

        reader.onload = function(){
            imagePreview.src = reader.result;
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
    }
</script>

</body>
</html>
