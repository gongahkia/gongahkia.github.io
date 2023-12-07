<html>
<head>
<title>Gabriel Ong Zhe Mian d66f8e9e</title>
</head>
<body>
<h1>Welcome to my guessing game</h1>
<p>
<?php
  if (!isset($_GET['guess'])) {
    echo("Missing guess parameter");
  } else if (strlen($_GET['guess']) < 1) {
    echo("Your guess is too short");
  } else if (!is_numeric($_GET['guess'])) {
    echo("Your guess is not a number");
  } else {
    $correct_number = 42; // Modify this to the correct answer chosen by the autograder
    $user_guess = (int)$_GET['guess'];

    if ($user_guess < $correct_number) {
      echo("Your guess is too low");
    } else if ($user_guess > $correct_number) {
      echo("Your guess is too high");
    } else {
      echo("Congratulations - You are right");
    }
  }
?>
</p>
</body>
</html>

