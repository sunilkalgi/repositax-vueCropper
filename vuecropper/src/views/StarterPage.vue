<template>
  <v-container fluid>
    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    />
    <div class="content">
      <v-row>
        <v-col cols="12" md="8" lg="8" sm="12">
          <section class="cropper-area">
            <div class="img-cropper">
              <vue-cropper
                ref="cropper"
                preview=".preview"
                :src="imgSrc"
                alt="Source Image"
              />
              <!-- <vue-cropper
                ref="cropper"
                :src="imgSrc"
                preview=".preview"
                :view-mode="1"
                :zoomable="false"
                :aspect-ratio="4"></vue-cropper> -->
            </div>
            <div class="actions">
              <a
                href="#"
                role="button"
                v-if="this.imgSrc"
                @click.prevent="cropImage"
              >
                CROP
              </a>
              <a
                href="#"
                role="button"
                v-if="this.imgSrc"
                @clickt.prevent="reset"
              >
                RESET
              </a>
              <a href="#" role="button" @click.prevent="showFileChooser">
                UPLOAD IMAGE
              </a>
            </div>
          </section>
        </v-col>
        <v-col cols="12" md="4" lg="4" sm="12">
          <section class="preview-area">
            <!-- <p>Preview</p>
            <div class="preview" /> -->
            <p>Cropped Image</p>
            <div class="cropped-image">
              <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
              <div v-else class="crop-placeholder">
                {{ this.selectImgToCrop }}
              </div>
            </div>
            <div class="actions">
              <!-- <v-btn  class="getCropBtn" @click="getImageData">getImageData</v-btn> -->
              <a
                href="#"
                v-if="isLoaded == false"
                role="button"
                @click.prevent="getImageData"
              >
                GET DATA
              </a>
              <div v-if="isLoaded">
                <a href="#" role="button">
                  <v-progress-circular color="white" indeterminate size="20">
                  </v-progress-circular
                ></a>
              </div>
            </div>
            <div>
              <v-textarea
                readonly
                auto-grow
                outlined
                v-model="getImgText"
                rows="1"
                row-height="15"
              ></v-textarea>
            </div>
          </section>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import axios from "axios";
export default {
  components: {
    VueCropper,
  },
  name: "StarterPage",
  data: () => ({
    img: "",
    isLoaded: false,
    selectImgToCrop: "",
    getImgText: "",
    imgSrc: "",
    cropImg: "",
    elementVisible: false,
  }),
  methods: {
    cropImage() {
      console.log(this.imgSrc, "this.imgSrc");
      // get image data for post processing, e.g. upload or setting image src
      if (this.imgSrc != "") {
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        console.log(this.cropImg, "hhhhhhhhhhhhhhh");
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
          let i = new FormData();
          i.append("picture", blob);
        });
      }
    },
    reset() {
      if (this.imgSrc != "") {
        this.$refs.cropper.reset();
      }
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    getImageData() {
      if (this.cropImg != "") {
        this.isLoaded = true;
        const formData = new FormData();
        formData.append("files", this.cropImg);
        axios
          .post("http://localhost:5000/getImage", formData)
          .then((response) => {
            this.isLoaded = false;
            this.getImgText = response.data;
            this.cropImg = "";
          });
      } else {
        this.selectImgToCrop = "please select the image to crop";
      }
    },
  },
};
</script>
<style>
.cropper-crop-box,
.cropper-view-box {
  border-radius: 0;
}
.cropper-view-box {
  box-shadow: 0 0 0 1px #39f;
  outline: 0;
}

.cropper-face {
  background-color: inherit !important;
}

.cropper-dashed,
.cropper-point.point-se,
.cropper-point.point-sw,
.cropper-point.point-nw,
.cropper-point.point-ne,
.cropper-line {
  display: inherit !important;
}

.cropper-view-box {
  outline: inherit !important;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  margin: 0 auto;
}

input[type="file"] {
  display: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}

.header h2 {
  margin: 0;
}

.header a {
  text-decoration: none;
  color: black;
}

.content {
  display: flex;
  justify-content: space-between;
}

/* .cropper-area {
  width: 614px;
} */

.actions {
  margin-top: 4px;
}
.getCropBtn {
  padding: 5px 15px;
  background: #0062cc;
  color: white;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062cc;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

textarea {
  width: 100%;
  height: 100px;
}

.preview-area {
  width: 350px;
  height: 350px;
}

.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.preview {
  width: 100%;
  height: calc(372px * (16 / 9));
  overflow: hidden;
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

.cropped-image img {
  max-width: 100%;
  max-height: 100%;
}
</style>
