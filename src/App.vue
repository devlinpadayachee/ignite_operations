<template>
    <div id="app">
        <nav class="navbar navbar-toggleable-md navbar-dark fixed-top scrolling-navbar">
            <div class="container">
                <button style="padding-top:15px;" class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#home">
                    <img class="d-inline-block align-top" height="55" src="./assets/img/logo.png" alt="logo">
                </a>
                <div style="padding-top:5px;" class="collapse navbar-collapse" id="navbarNav1">
                    <ul class="navbar-nav mr-auto smooth-scroll">
                    </ul>
                </div>
            </div>
        </nav>
        <div id="video-carousel-example2" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner " role="listbox" data-spy="scroll" data-target="#home" data-offset="0">
                <div class="carousel-item active">
                    <div class="view">
                        <video autoplay="" loop="" class="video-full" data-wow-delay="1s" id="video-background">
                            <source src="/static/backdropvid.mp4" type="video/mp4">Your browser does not support the video tag. I suggest you upgrade your browser.
                        </video>
                    </div>
                    <div class="carousel-caption">
                        <div class="flex-center wow animated fadeInDown" data-wow-delay="1s">
                            <div class="container my-5">
                                <div class="row align-items-end">
                                    <div class="col">
                                        <img class="my-1 z-depth-3" style="width: 4rem; border-radius :100px" src="./assets/img/LTE-A-colour.svg" alt="LTE-A">
                                        <router-link class="nav-link" to="/lte"><h2>LTE-A</h2></router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Lte from './components/Lte'
export default {
  name: 'app',
  components: {
    Lte
  }
}
</script>
<style>
</style>
