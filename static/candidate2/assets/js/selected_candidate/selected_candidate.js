document.addEventListener('turbo:load', loadSelectedCandidateData);

function loadSelectedCandidateData(){
    if ($('#filterCandidateStatus').length) {
        $('#filterCandidateStatus').select2();
    }
}

listenChange("#selectedCandidateStatus", function() {
         Livewire.dispatch("changeStatusFilter", { status: $(this).val() });
     });
listenClick("#selectedCandidate-ResetFilter", function() {
         $("#selectedCandidateStatus").val(5).change();
         hideDropdownManually($('#selectedCandidateFilterBtn'), $('.dropdown-menu'));
     });
function hideDropdownManually(button, menu) {
              button.dropdown('toggle');
     }
