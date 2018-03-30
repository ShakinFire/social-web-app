function showAlert (message) {
    var $modal = $('.modal-warning');
    $modal.find('.message').text(" " + message);
    $modal.modal('toggle');
};
