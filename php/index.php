<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP + GSAP</title>
    <style>
        .box { width: 50px; height: 50px; background: cyan; margin: 10px; display: inline-block; }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
    <?php 
        // Let's create an array of names
        $items = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];

        // PHP loops through the array and creates a div for each one
        foreach ($items as $item) {
            echo "<div class='box'>$item</div>";
        }
    ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
        // GSAP animates all the boxes PHP just created!
        gsap.from(".box", {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "back"
        });
    </script>
</body>
</html>