
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
    var idjugador;

    function defjugadores(a){
        idjugador=a;
    }

    function onPhotoDataSuccess(imageData) {

        if (idjugador == 1) {
            var imagenjugador1 = document.getElementById("imgjugador_1");
            imagenjugador1.setAttribute("src", "data:image/jpeg;base64," + imageData);
            Store.save("imagenjugador1","data:image/jpeg;base64," + imageData);
            //imagen_uno.style.display = 'block';
        } else {
            var imagenjugador2 = document.getElementById("imgjugador_2");
            imagenjugador2.setAttribute("src", "data:image/jpeg;base64," + imageData);
            Store.save("imagenjugador2","data:image/jpeg;base64," + imageData);
            
            //imagen_dos.style.display = 'block';
        }
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
