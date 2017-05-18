$(document).ready(function() {
  let mediaPlayers = window.mediaPlayers = $('.mediaPlayer'),
      selectors = $('select'),
      fileInputs = $('[type="file"]'),
      // urlInputs = $('[type="text"]'),
      playButton = $('#playButton'),
      pauseButton = $('#pauseButton'),
      fullScreenButton = $('#fullScreenButton');


  navigator.getUserMedia({
    audio: true,
    video: false
  }, function(localMediaStream) {
    navigator.mediaDevices.enumerateDevices().then(setDeviceSelectors);
  }, function(err) {
    console.log(err);
  });

  function setDeviceSelectors(devices) {
    $.each(devices, function(index, device) {
      if(device.kind === 'audiooutput') {
        selectors.append($('<option>', {value: device.deviceId, text: device.label}));
      }
    })
    selectors.material_select();
  }

  playButton.click(function() {

  });

  fullScreenButton.click(function() {
    mediaPlayers[0].webkitEnterFullscreen();
  });

  playButton.click(function() {
    mediaPlayers.each(function(i, player) {
      player.play();
    });
  });

  pauseButton.click(function() {
    mediaPlayers.each(function(i, player) {
      player.pause();
    });
  });

  fileInputs.each(function(i, input) {
    $(input).change(function(e) {
      mediaPlayers[i].setAttribute('src', URL.createObjectURL(this.files[0]));
      mediaPlayers[i].load();
    });
  });

  // urlInputs.each(function(i, input) {
  //   $(input).change(function(e) {
  //     mediaPlayers[i].setAttribute('src', this.value);
  //     mediaPlayers[i].load();
  //   });
  // });

  selectors.each(function(i, selector) {
    $(selector).change(function(e) {
      mediaPlayers[i].setSinkId(e.target.value)
    });
  });


});
