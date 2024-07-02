(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:true,
	    dots: true,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});

		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	$('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('.appointment_time').timepicker();


})(jQuery);


document.addEventListener("DOMContentLoaded", function() {
    var header = document.querySelector(".sticky-header");
	var activeNavLink = document.querySelector('.ftco-navbar-light .navbar-nav > .nav-item.active > a');

    window.addEventListener("scroll", function() {
        if (window.scrollY > 30) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
			activeNavLink.classList.add('hidden-before');
        }
    });
});

function formSubmit(){
        const formEl = document.querySelector('.contactForm');
        formEl.addEventListener('submit', event => {
        event.preventDefault();
        let formData = new FormData(formEl);
        let data = Object.fromEntries(formData);
        let jsonData = JSON.stringify(data)
        if(!validateForm())
        {
          return;
        }
        fetch('https://localhost:5001/api/Library/FormData', {
         method: 'POST',
         headers: { 
                    'Content-Type': 'application/json',
          },
          body: jsonData
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
        alert('Form Submitted');
		Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
});
        });
}


function sendEmail(){
	const formEl = document.querySelector('.contactForm');
    document.getElementById('contactForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);

      fetch('https://localhost:5001/api/Email/sendemail', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          alert('Email sent successfully!');
		  formEl.reset();
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  });
  }

  function validateForm() {
	let isValid = true;
	document.getElementById("nameerror").textContent = "";
	document.getElementById("emailerror").textContent = "";
	// document.getElementById("phoneerror").textContent = "";
	document.getElementById("messageerror").textContent = "";
  
	// Validate Name
	const name = document.getElementById("name").value;
	const nameString = /^[a-zA-Z\s-]+$/;
	if (name === "") {
	  document.getElementById("nameerror").textContent = "Please enter your name.";
	  isValid = false;
	} 
	if(!nameString.test(name)) {
	  document.getElementById("nameerror").textContent = "Please enter a Valid Name.";
	  isValid = false;
	}
  
  
	// Validate Email
	const email = document.getElementById("email").value;
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (email === "") {
	  document.getElementById("emailerror").textContent = "Please enter your email.";
	  isValid = false;
	} 
	if (!emailPattern.test(email)) {
	  document.getElementById("emailerror").textContent = "Please enter a valid email address.";
	  isValid = false;
	}
  
	// Validate Message
	const message = document.getElementById("message").value;
	if (message === "") {
	  document.getElementById("messageerror").textContent = "Please enter your message.";
	  isValid = false;
	}
  
	return isValid;
  }
  

  const projects = {
	1: {
	  title: "Pubs, Bars and Restaurants",
	  image1: "images/pub.jpg",
	  image2: "images/work-1.jpg",
	  image3: "images/work-4.jpg",
	  description: "Roofing for pubs and restaurants is a critical aspect of the overall building design, combining functionality, aesthetics, and durability. Here are key considerations, features, and benefits specific to roofing solutions for these types of establishments",
	  faq1: "Q1: Why is roofing important for pubs, bars, and restaurants?",
	  faq2: "Q2: What are the best roofing materials for pubs, bars, and restaurants?",
	  faq3: "Q3: How often should a roof be inspected?",
	  faq4: "Q4: How long does it take to install a new roof?",
	  faq5: "Q5: What is the typical lifespan of a commercial roof?",
	  faq6: "Q6: What are the signs that a roof needs repair or replacement?",
	  faq7: "Q7: Can roof repairs be done without closing the business?",
	  ans1: "A1: A durable and well-maintained roof ensures the safety and comfort of patrons and staff, protects the building from weather damage, and enhances the establishment's overall aesthetic appeal.",
	  ans2: "A2: The best materials include metal roofing, asphalt shingles, slate, and TPO (Thermoplastic Olefin) roofing. Each material offers different benefits in terms of durability, maintenance, and cost.",
	  ans3: "A3: Roofs should be inspected at least twice a year, preferably in the spring and fall. Additionally, inspections should be conducted after severe weather events.",
	  ans4: "A4: The installation time varies based on the roof size, complexity, and material. Generally, it can take anywhere from a few days to a few weeks.",
	  ans5: "A5: Lifespan varies by material: asphalt shingles last 15-30 years, metal roofs 40-70 years, and slate roofs can last over 100 years with proper maintenance.",
	  ans6: "A6: Signs include leaks, missing or damaged shingles, sagging, mold or moss growth, and visible damage to roof structures.",
	  ans7: "A7: In many cases, repairs can be performed without disrupting business operations. However, significant repairs or replacements might require temporary closures for safety reasons."

	},
	2: {
	  title: "Government Construction",
	  image1: "images/government.jpg",
	  image2: "images/work-1.jpg",
	  image3: "images/work-3.jpg",
	  description: "Government buildings require roofing solutions that prioritize durability, energy efficiency, security, and sustainability. These buildings often serve the public and house critical operations, so their roofing systems must meet high standards of performance and compliance. Here are key aspects and features specific to roofing for government buildings.",
	  faq1: "Q1: Why is roofing important for pubs, bars, and restaurants?",
	  faq2: "Q2: What are the best roofing materials for pubs, bars, and restaurants?",
	  faq3: "Q3: How often should a roof be inspected?",
	  faq4: "Q4: How long does it take to install a new roof?",
	  faq5: "Q5: What is the typical lifespan of a commercial roof?",
	  faq6: "Q6: What are the signs that a roof needs repair or replacement?",
	  faq7: "Q7: Can roof repairs be done without closing the business?",
	  ans1: "A1: A durable and well-maintained roof ensures the safety and comfort of patrons and staff, protects the building from weather damage, and enhances the establishment's overall aesthetic appeal.",
	  ans2: "A2: The best materials include metal roofing, asphalt shingles, slate, and TPO (Thermoplastic Olefin) roofing. Each material offers different benefits in terms of durability, maintenance, and cost.",
	  ans3: "A3: Roofs should be inspected at least twice a year, preferably in the spring and fall. Additionally, inspections should be conducted after severe weather events.",
	  ans4: "A4: The installation time varies based on the roof size, complexity, and material. Generally, it can take anywhere from a few days to a few weeks.",
	  ans5: "A5: Lifespan varies by material: asphalt shingles last 15-30 years, metal roofs 40-70 years, and slate roofs can last over 100 years with proper maintenance.",
	  ans6: "A6: Signs include leaks, missing or damaged shingles, sagging, mold or moss growth, and visible damage to roof structures.",
	  ans7: "A7: In many cases, repairs can be performed without disrupting business operations. However, significant repairs or replacements might require temporary closures for safety reasons."
	},
	3: {
	  title: "Solar Roofing",
	  image1: "images/solarpanel1.jpg",
	  image2: "images/work-1.jpg",
	  image3: "images/work-6.jpg",
	  description: "Industrial solar roofing refers to the installation of solar panels on the rooftops of industrial buildings to generate renewable energy. This type of solar installation is designed to meet the high energy demands of industrial operations, reducing reliance on traditional energy sources and lowering overall operational costs.",
	  faq1: "Q1: Why is roofing important for pubs, bars, and restaurants?",
	  faq2: "Q2: What are the best roofing materials for pubs, bars, and restaurants?",
	  faq3: "Q3: How often should a roof be inspected?",
	  faq4: "Q4: How long does it take to install a new roof?",
	  faq5: "Q5: What is the typical lifespan of a commercial roof?",
	  faq6: "Q6: What are the signs that a roof needs repair or replacement?",
	  faq7: "Q7: Can roof repairs be done without closing the business?",
	  ans1: "A1: A durable and well-maintained roof ensures the safety and comfort of patrons and staff, protects the building from weather damage, and enhances the establishment's overall aesthetic appeal.",
	  ans2: "A2: The best materials include metal roofing, asphalt shingles, slate, and TPO (Thermoplastic Olefin) roofing. Each material offers different benefits in terms of durability, maintenance, and cost.",
	  ans3: "A3: Roofs should be inspected at least twice a year, preferably in the spring and fall. Additionally, inspections should be conducted after severe weather events.",
	  ans4: "A4: The installation time varies based on the roof size, complexity, and material. Generally, it can take anywhere from a few days to a few weeks.",
	  ans5: "A5: Lifespan varies by material: asphalt shingles last 15-30 years, metal roofs 40-70 years, and slate roofs can last over 100 years with proper maintenance.",
	  ans6: "A6: Signs include leaks, missing or damaged shingles, sagging, mold or moss growth, and visible damage to roof structures.",
	  ans7: "A7: In many cases, repairs can be performed without disrupting business operations. However, significant repairs or replacements might require temporary closures for safety reasons."
	},
	4: {
	  title: "House Roof",
	  image1: "images/work-4.jpg",
	  image2: "images/work-1.jpg",
	  image3: "images/work-12.jpg",
	  description: "When considering roofing for residential houses, several factors come into play, including aesthetic appeal, durability, weather resistance, energy efficiency, and cost. Here’s a comprehensive overview of the key aspects, features, and benefits specific to residential roofing.",
	  faq1: "Q1: Why is roofing important for pubs, bars, and restaurants?",
	  faq2: "Q2: What are the best roofing materials for pubs, bars, and restaurants?",
	  faq3: "Q3: How often should a roof be inspected?",
	  faq4: "Q4: How long does it take to install a new roof?",
	  faq5: "Q5: What is the typical lifespan of a commercial roof?",
	  faq6: "Q6: What are the signs that a roof needs repair or replacement?",
	  faq7: "Q7: Can roof repairs be done without closing the business?",
	  ans1: "A1: A durable and well-maintained roof ensures the safety and comfort of patrons and staff, protects the building from weather damage, and enhances the establishment's overall aesthetic appeal.",
	  ans2: "A2: The best materials include metal roofing, asphalt shingles, slate, and TPO (Thermoplastic Olefin) roofing. Each material offers different benefits in terms of durability, maintenance, and cost.",
	  ans3: "A3: Roofs should be inspected at least twice a year, preferably in the spring and fall. Additionally, inspections should be conducted after severe weather events.",
	  ans4: "A4: The installation time varies based on the roof size, complexity, and material. Generally, it can take anywhere from a few days to a few weeks.",
	  ans5: "A5: Lifespan varies by material: asphalt shingles last 15-30 years, metal roofs 40-70 years, and slate roofs can last over 100 years with proper maintenance.",
	  ans6: "A6: Signs include leaks, missing or damaged shingles, sagging, mold or moss growth, and visible damage to roof structures.",
	  ans7: "A7: In many cases, repairs can be performed without disrupting business operations. However, significant repairs or replacements might require temporary closures for safety reasons."
	},
	5: {
	  title: "Industrial Roofing",
	  image1: "images/indusroofing.jpg",
	  image2: "images/work-1.jpg",
	  image3: "images/work-2.jpg",
	  description: "Industrial roofing refers to the installation of solar panels on the rooftops of industrial buildings to generate renewable energy. This type of solar installation is designed to meet the high energy demands of industrial operations, reducing reliance on traditional energy sources and lowering overall operational costs.",
	  faq1: "Q1: Why is roofing important for pubs, bars, and restaurants?",
	  faq2: "Q2: What are the best roofing materials for pubs, bars, and restaurants?",
	  faq3: "Q3: How often should a roof be inspected?",
	  faq4: "Q4: How long does it take to install a new roof?",
	  faq5: "Q5: What is the typical lifespan of a commercial roof?",
	  faq6: "Q6: What are the signs that a roof needs repair or replacement?",
	  faq7: "Q7: Can roof repairs be done without closing the business?",
	  ans1: "A1: A durable and well-maintained roof ensures the safety and comfort of patrons and staff, protects the building from weather damage, and enhances the establishment's overall aesthetic appeal.",
	  ans2: "A2: The best materials include metal roofing, asphalt shingles, slate, and TPO (Thermoplastic Olefin) roofing. Each material offers different benefits in terms of durability, maintenance, and cost.",
	  ans3: "A3: Roofs should be inspected at least twice a year, preferably in the spring and fall. Additionally, inspections should be conducted after severe weather events.",
	  ans4: "A4: The installation time varies based on the roof size, complexity, and material. Generally, it can take anywhere from a few days to a few weeks.",
	  ans5: "A5: Lifespan varies by material: asphalt shingles last 15-30 years, metal roofs 40-70 years, and slate roofs can last over 100 years with proper maintenance.",
	  ans6: "A6: Signs include leaks, missing or damaged shingles, sagging, mold or moss growth, and visible damage to roof structures.",
	  ans7: "A7: In many cases, repairs can be performed without disrupting business operations. However, significant repairs or replacements might require temporary closures for safety reasons."
	},
	6: {
	  title: "Industrial Solar Roofing",
	  image1: "images/solarpanel1.jpg",
	  image2: "images/work-1.jpg",
	  image3: "images/work-2.jpg",
	  description: "Industrial solar roofing refers to the installation of solar panels on the rooftops of industrial buildings to generate renewable energy. This type of solar installation is designed to meet the high energy demands of industrial operations, reducing reliance on traditional energy sources and lowering overall operational costs.",
	  faq1: "Q1: What is industrial solar roofing?",
	  faq2: "Q2: How does industrial solar roofing work?",
	  faq3: "Q3: What are the benefits of installing solar roofing on industrial buildings?",
	  faq4: "Q4: How much can I save on energy costs with industrial solar roofing?",
	  faq5: "Q5: What is the typical process for installing solar panels on an industrial roof?",
	  faq6: "Q6: How long does it take to install solar roofing on an industrial building?",
	  faq7: "Q7: What maintenance is required for industrial solar roofing?",
	  ans1: "A1: Industrial solar roofing refers to the installation of solar panels on the roofs of industrial buildings to generate electricity. This setup helps industries reduce energy costs and carbon footprint by harnessing solar energy.",
	  ans2: "A2: Solar panels installed on the roof capture sunlight and convert it into electricity using photovoltaic cells. This electricity can be used to power the facility, stored in batteries, or fed back into the grid.",
	  ans3: "A3: Benefits include reduced energy costs, tax incentives, reduced carbon emissions, energy independence, and potential income from selling excess power back to the grid.",
	  ans4: "A4: Savings depend on factors like the size of the installation, local solar irradiance, and energy consumption patterns. Typically, businesses can save 20-50% on energy costs.",
	  ans5: "A5: The process involves site assessment, system design, obtaining permits, installation of mounting structures, panel installation, electrical wiring, inspection, and connection to the grid.",
	  ans6: "A6: The timeline varies but generally ranges from a few weeks to a few months, depending on the size of the installation and complexity of the project.",
	  ans7: "A7: Maintenance is minimal but includes regular cleaning of panels, annual inspections, and occasional checks on the electrical components to ensure optimal performance."
	},
	7: {
	  title: "Building Roofing",
	  image1: "images/work-7.jpg",
	  image2: "images/work-1.jpg",
	  image3: "images/work-4.jpg",
	  description: "When considering roofing for residential houses, several factors come into play, including aesthetic appeal, durability, weather resistance, energy efficiency, and cost. Here’s a comprehensive overview of the key aspects, features, and benefits specific to residential roofing.",
	  faq1: "Q1: Why is roofing important for pubs, bars, and restaurants?",
	  faq2: "Q2: What are the best roofing materials for pubs, bars, and restaurants?",
	  faq3: "Q3: How often should a roof be inspected?",
	  faq4: "Q4: How long does it take to install a new roof?",
	  faq5: "Q5: What is the typical lifespan of a commercial roof?",
	  faq6: "Q6: What are the signs that a roof needs repair or replacement?",
	  faq7: "Q7: Can roof repairs be done without closing the business?",
	  ans1: "A1: A durable and well-maintained roof ensures the safety and comfort of patrons and staff, protects the building from weather damage, and enhances the establishment's overall aesthetic appeal.",
	  ans2: "A2: The best materials include metal roofing, asphalt shingles, slate, and TPO (Thermoplastic Olefin) roofing. Each material offers different benefits in terms of durability, maintenance, and cost.",
	  ans3: "A3: Roofs should be inspected at least twice a year, preferably in the spring and fall. Additionally, inspections should be conducted after severe weather events.",
	  ans4: "A4: The installation time varies based on the roof size, complexity, and material. Generally, it can take anywhere from a few days to a few weeks.",
	  ans5: "A5: Lifespan varies by material: asphalt shingles last 15-30 years, metal roofs 40-70 years, and slate roofs can last over 100 years with proper maintenance.",
	  ans6: "A6: Signs include leaks, missing or damaged shingles, sagging, mold or moss growth, and visible damage to roof structures.",
	  ans7: "A7: In many cases, repairs can be performed without disrupting business operations. However, significant repairs or replacements might require temporary closures for safety reasons."
	},
	8: {
	  title: "Others",
	  image1: "images/work-8.jpg",
	  image2: "images/work-1.jpg",
	  image3: "images/work-3.jpg",
	  description: "When considering roofing for residential houses, several factors come into play, including aesthetic appeal, durability, weather resistance, energy efficiency, and cost. Here’s a comprehensive overview of the key aspects, features, and benefits specific to residential roofing.",
	  faq1: "Q1: Why is roofing important for pubs, bars, and restaurants?",
	  faq2: "Q2: What are the best roofing materials for pubs, bars, and restaurants?",
	  faq3: "Q3: How often should a roof be inspected?",
	  faq4: "Q4: How long does it take to install a new roof?",
	  faq5: "Q5: What is the typical lifespan of a commercial roof?",
	  faq6: "Q6: What are the signs that a roof needs repair or replacement?",
	  faq7: "Q7: Can roof repairs be done without closing the business?",
	  ans1: "A1: A durable and well-maintained roof ensures the safety and comfort of patrons and staff, protects the building from weather damage, and enhances the establishment's overall aesthetic appeal.",
	  ans2: "A2: The best materials include metal roofing, asphalt shingles, slate, and TPO (Thermoplastic Olefin) roofing. Each material offers different benefits in terms of durability, maintenance, and cost.",
	  ans3: "A3: Roofs should be inspected at least twice a year, preferably in the spring and fall. Additionally, inspections should be conducted after severe weather events.",
	  ans4: "A4: The installation time varies based on the roof size, complexity, and material. Generally, it can take anywhere from a few days to a few weeks.",
	  ans5: "A5: Lifespan varies by material: asphalt shingles last 15-30 years, metal roofs 40-70 years, and slate roofs can last over 100 years with proper maintenance.",
	  ans6: "A6: Signs include leaks, missing or damaged shingles, sagging, mold or moss growth, and visible damage to roof structures.",
	  ans7: "A7: In many cases, repairs can be performed without disrupting business operations. However, significant repairs or replacements might require temporary closures for safety reasons."
	}
  };
  

  function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
  }
  

  const projectId = getQueryParam('id');
  
  const project = projects[projectId];
  
  if (project) {
	document.getElementById('project-title').textContent = project.title;
	document.getElementById('project-image1').src = project.image1;
	document.getElementById('project-image2').src = project.image2;
	document.getElementById('project-image3').src = project.image3;
	document.getElementById('project-description').textContent = project.description;
	document.getElementById('faq1').textContent = project.faq1;
	document.getElementById('faq2').textContent = project.faq2;
	document.getElementById('faq3').textContent = project.faq3;
	document.getElementById('faq4').textContent = project.faq4;
	document.getElementById('faq5').textContent = project.faq5;
	document.getElementById('faq6').textContent = project.faq6;
	document.getElementById('faq7').textContent = project.faq7;
	document.getElementById('ans1').textContent = project.ans1;
	document.getElementById('ans2').textContent = project.ans2;
	document.getElementById('ans3').textContent = project.ans3;
	document.getElementById('ans4').textContent = project.ans4;
	document.getElementById('ans5').textContent = project.ans5;
	document.getElementById('ans6').textContent = project.ans6;
	document.getElementById('ans7').textContent = project.ans7;

  } else {
	document.getElementById('project-title').textContent = 'Project not found';
  }

  document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.project-slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlides();
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlides();
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    showSlides();
});

function formSubmitQuote() {
	const formEl = document.querySelector('.appointment');
	formEl.addEventListener('submit', event => {
	  event.preventDefault();
	  
	  let formData = new FormData(formEl);
	  let data = Object.fromEntries(formData);

	  if (data.services) {
		data.services = parseInt(data.services, 10);
	  }

	  let jsonData = JSON.stringify(data);

	  if (!validateForm()) {
		return;
	  }
	  fetch('https://localhost:7024/api/Roofing', {
		method: 'POST',
		headers: { 
		  'Content-Type': 'application/json',
		},
		body: jsonData
	  })
	  .then(res => res.json())
	  .then(data => console.log(data))
	  .catch(error => console.log(error));

	  alert('Form Submitted');
	});
  }
  document.addEventListener('DOMContentLoaded', formSubmitQuote);


  function FormSendEmail() {
	const formEl = document.querySelector('.appointment');
	formEl.addEventListener('submit', event => {
	  event.preventDefault();
	  
	
	  let formData = new FormData(event.target);
	  let data = Object.fromEntries(formData);

	 
	  if (data.services) {
		data.services = parseInt(data.services, 10);
	  }

	  let jsonData = JSON.stringify(data);

	  
	  if (!validateForm()) {
		return;
	  }


	  fetch('https://localhost:7024/api/Email/sendemail', {
		method: 'POST',
		headers: { 
		  'Content-Type': 'application/json',
		},
		body: jsonData
	  })
	  .then(res => res.json())
	  .then(data => console.log(data))
	  .catch(error => console.log(error));

	  alert('Email Send Successfully');
	  formEl.reset();
	});
  }
  document.addEventListener('DOMContentLoaded', FormSendEmail);
//   function formSubmitQuote(){
// 	const formEl = document.querySelector('.appointment');
// 	formEl.addEventListener('submit', event => {
// 	event.preventDefault();
// 	let formData = new FormData(formEl);
// 	let data = Object.fromEntries(formData);
// 	let jsonData = JSON.stringify(data)
// 	if(!validateForm())
// 	{
// 	  return;
// 	}
// 	fetch('https://localhost:7024/api/Roofing', {
// 	 method: 'POST',
// 	 headers: { 
// 				'Content-Type': 'application/json',
// 	  },
// 	  body: jsonData
// 	}).then(res => res.json())
// 	.then(data => console.log(data))
// 	.catch(error => console.log(error));
// 	alert('Form Submitted');
	
// 	});
// }