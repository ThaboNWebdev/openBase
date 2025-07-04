<?php
$title = $_POST['title'];
$audio = $_FILES['audio'];
$cover = $_FILES['cover'];

if (!$title || !$audio || !$cover) {
    die("Missing data.");
}

$musicPath = "music/" . basename($audio["name"]);
$coverPath = "cover/" . basename($cover["name"]);

move_uploaded_file($audio["tmp_name"], $musicPath);
move_uploaded_file($cover["tmp_name"], $coverPath);

$songs = [];
if (file_exists("songs.json")) {
    $songs = json_decode(file_get_contents("songs.json"), true);
}

$songs[] = [
    "title" => $title,
    "file" => $musicPath,
    "cover" => $coverPath
];

file_put_contents("songs.json", json_encode($songs, JSON_PRETTY_PRINT));

echo "✅ Upload successful! <a href='admin.html'>Back</a>";
?>
