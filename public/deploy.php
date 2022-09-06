<?php
$commands=array(
    'echo $PWD',
    'whoami',
    'git pull',
    'git status',
    'git submodule sync',
    'git submodule update',
    'git submodule status'
);
// Exec Commands
chdir('/saas/saas_iotwave');
$output='';
foreach ($commands as $command) {
    $tmp=shell_exec($command);
    $output.="<span style=\"color: #6BE234;\">\$</span><span style=\"color: #729FCF;\">{$command}\n</span><br />";
    $output.=htmlentities(trim($tmp))."\n<br /><br />";
}
?>

<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <title>GIT DEPLOYMENT SCRIPT</title>
</head>
<body>
<div>
    <p style="color: white;">Git Deployment Script</p>
    <?php echo $output; ?>
</div>
</body>
</html>
