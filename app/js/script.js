$('.cari').on('click', function () {
  $('.hasil-cari').html('');
  $.ajax({
    url: 'http://www.omdbapi.com/',
    dataType: 'json',
    data: {
      'apikey': '14281a33',
      's': $('.input').val()
    },
    success: function (hasil) {
      if (hasil.Response == 'True') {

        let film = hasil.Search;
        $.each(film, function (i, data) {
          $('.hasil-cari').append(`
          <div class="col-md-4">
            <div class="card">
              <img src="${data.Poster} " class="card-img-top">
              <div class="card-body">
              <h5 class="card-title">${data.Title} </h5>
              <p class="card-text">${data.Year} </p>
              <a href="${data.Poster}" class="btn btn-success" target="blank">Download gambar</a>
              <button class="ml-3 btn btn-outline-success detail" data-toggle="modal" data-id="${data.imdbID}" data-target="#exampleModal">detail</button>
            </div>
          </div>
            
          `);

          $('.hasil-cari').on('click', '.detail', function () {
            $.ajax({
              url: 'http://www.omdbapi.com/',
              dataType: 'json',
              data: {
                'apikey': '14281a33',
                'i': $(this).data('id')
              },
              success: function (hasil) {
                $('.modal-body').html(`
                <div class="row">
                <div class="col-lg-5">
                  <img
                    src="${hasil.Poster}">
                </div>
                <div class="col-lg-7">
                  <ul class="list-group">
                    <li class="list-group-item">Judul : ${hasil.Title}</li>
                    <li class="list-group-item">Tahun : ${hasil.Year}</li>
                    <li class="list-group-item">Rilis : ${hasil.Released}</li>
                    <li class="list-group-item">Director : ${hasil.Director}</li>
                    <li class="list-group-item">Pemeran : ${hasil.Actors}</li>
                    <li class="list-group-item">Negara : ${hasil.Country}</li>
                    <li class="list-group-item">Plot : ${hasil.Plot}</li>
                  </ul>
                </div>
              </div>
                
                `);
              }
            });

          });
        });
        $('.input').val('');
      } else {
        $('.hasil-cari').html(`<div class="col">
                                <h1 class="text-center">tidak ada data film</h1>
                                </div>`);
      }
    }
  });
});