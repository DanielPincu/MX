<template>
 <section id="home" class="video-banner">
    
  <video autoplay loop muted playsinline>
    <source src="@/assets/matrix.mp4" type="video/mp4" />
  </video>
  <div class="video-content mt-20 lg:grid grid-cols-2 items-center justify-around mx-10">

      <div class="flex flex-col justify-center items-center">
            <div class="">
                <h1 class="text-3xl md:text-6xl font-bold mb-4">Daniel Pincu</h1>
                <p class="text-xl md:text-2xl">Web Developer</p>
                <p class="mt-4 text-lg">"The Matrix has you..."</p>
            </div>
            
            
            <div class="flex flex-row gap-10 my-10">
                <button class="blink-red button bg-red-500  shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 2xl:px-0 rounded-full w-38 md:w-44">
                <span>Fetch CV</span>
                <div class="liquid"></div>
                </button>


                <button class="blink-blue block dark:hidden button bg-blue-500 shadow-lg border-b-2 border-slate-50 text-white font-bold text-sm md:text-xl px-5 md:py-6 2xl:px-0 rounded-full w-38 md:w-44">
                <span>Watch CV</span>
                <div class="liquid2"></div>
                </button>

            </div>
      </div>
      

      <div class="flex justify-center pt-10">
        <img class="w-full project-card rounded-3xl" src="@/assets/ddd.jpeg" alt="">
      </div>

  </div>
  
</section>

<section id="hobbies" class="py-20 bg-gray-900 project-card my-20">
                <h2 class="text-3xl font-bold mb-8 text-center">Hobbies & Interests</h2>
                <div class="hobby-ticker overflow-hidden">
                    <div class="hobby-ticker-content space-x-8 inline-block">
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-code text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">CODING</h3>
                            
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-camera text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">3D PRINTING</h3>
                            
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-book text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">AMATØR RADIO</h3>
                            
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-gamepad text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">ASTRONOMY</h3>
                           
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-music text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">ELECTRONICS</h3>
                            
                        </div>
                        
                        <!-- Duplicate the items to create a seamless loop -->
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-code text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">IOT</h3>
                           
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-camera text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">REMOTE PILOT</h3>
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-code text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">PHP Developer</h3>
                        </div>

                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-code text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">CODING</h3>
                            
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-camera text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">3D PRINTING</h3>
                            
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-book text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">AMATØR RADIO</h3>
                            
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-gamepad text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">ASTRONOMY</h3>
                           
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-music text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">ELECTRONICS</h3>
                            
                        </div>
                        
                        <!-- Duplicate the items to create a seamless loop -->
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-code text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">IOT</h3>
                           
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-camera text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">REMOTE PILOT</h3>
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-code text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">PHP Developer</h3>
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-gamepad text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">ASTRONOMY</h3>
                           
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-music text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">ELECTRONICS</h3>
                            
                        </div>
                        
                        <!-- Duplicate the items to create a seamless loop -->
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-code text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">IOT</h3>
                           
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-camera text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">REMOTE PILOT</h3>
                        </div>
                        <div class="hobby-item bg-gray-800 p-6 rounded-lg text-center inline-block flex-shrink-0 w-64">
                            <i class="fas fa-code text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">PHP Developer</h3>
                        </div>
                    </div>
                    
                </div>
</section>


<section id="expertise" class="py-20 container mx-auto">
 <h2 class="text-3xl font-bold mb-8 text-center">Expertise</h2>
 <div class="grid md:grid-cols-3 gap-8 fade-in">

  <div class="bg-gray-800 p-6 rounded-lg project-card">
      <h3 class="text-xl font-bold mb-2">Front-End Development</h3>
      <p>With a passion for crafting seamless user experiences, I specialize in building responsive and interactive web applications. My expertise in HTML5, CSS3, and JavaScript allows me to bring designs to life while ensuring optimal performance across devices.</p>
  </div>

    <div class="bg-gray-800 p-6 rounded-lg project-card">
      <h3 class="text-xl font-bold mb-2">VueJS</h3>
      <p>As a dedicated Vue.js developer, I leverage its powerful features to create dynamic single-page applications. My proficiency in Vue's ecosystem enables me to build scalable and maintainable codebases that enhance user engagement and satisfaction.</p>
    </div>

    <div class="bg-gray-800 p-6 rounded-lg project-card">
      <h3 class="text-xl font-bold mb-2">WordPress</h3>
      <p>With extensive experience in WordPress, I develop custom themes and plugins tailored to meet client needs. My knowledge of PHP allows me to extend functionality and optimize performance, ensuring a robust and user-friendly experience.</p>
    </div>
    
 </div>
</section>

</template>

















<script setup>

</script>

