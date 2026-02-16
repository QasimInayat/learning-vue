<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Hero Section -->
        <div class="bg-blue-600 text-white py-20">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-4xl font-bold mb-4">About Us</h1>
                <p class="text-xl opacity-90">Building the future of web development, one line of code at a time.</p>
            </div>
        </div>

        <!-- Mission Section -->
        <div class="container mx-auto px-6 py-16">
            <div class="flex flex-col md:flex-row items-center">
                <div class="md:w-1/2 mb-8 md:mb-0">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Team" class="rounded-lg shadow-lg">
                </div>
                <div class="md:w-1/2 md:pl-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                    <p class="text-gray-600 leading-relaxed mb-6">
                        We are passionate about creating seamless digital experiences. Our goal is to empower developers and businesses by providing top-notch tools and resources to build modern web applications.
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        Whether you're just starting out or looking to scale, we're here to support your journey with cutting-edge technology and a community-driven approach.
                    </p>
                </div>
            </div>
        </div>

        <!-- Stats Section -->
        <div class="bg-white py-16">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 class="text-4xl font-bold text-blue-600 mb-2">500+</h3>
                        <p class="text-gray-600">Happy Clients</p>
                    </div>
                    <div>
                        <h3 class="text-4xl font-bold text-blue-600 mb-2">100+</h3>
                        <p class="text-gray-600">Projects Completed</p>
                    </div>
                    <div>
                        <h3 class="text-4xl font-bold text-blue-600 mb-2">24/7</h3>
                        <p class="text-gray-600">Support Available</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Team Section -->
        <div class="container mx-auto px-6 py-20">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Team Member 1 -->
                <div class="bg-white rounded-lg shadow p-6 text-center">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100">
                    <h3 class="text-xl font-bold text-gray-800">John Doe</h3>
                    <p class="text-blue-500 mb-4">CEO & Founder</p>
                    <p class="text-gray-600 text-sm">Visionary leader with 10+ years of experience in tech innovation.</p>
                </div>
                <!-- Team Member 2 -->
                <div class="bg-white rounded-lg shadow p-6 text-center">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Smith" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100">
                    <h3 class="text-xl font-bold text-gray-800">Jane Smith</h3>
                    <p class="text-blue-500 mb-4">Lead Developer</p>
                    <p class="text-gray-600 text-sm">Full-stack wizard specializing in Vue.js and Laravel architectures.</p>
                </div>
                 <!-- Team Member 3 -->
                <div class="bg-white rounded-lg shadow p-6 text-center">
                    <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Mike Johnson" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100">
                    <h3 class="text-xl font-bold text-gray-800">Mike Johnson</h3>
                    <p class="text-blue-500 mb-4">Product Designer</p>
                    <p class="text-gray-600 text-sm">Creative mind behind our intuitive and beautiful user interfaces.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>
