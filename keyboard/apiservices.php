<?php 
header("Access-Control-Allow-Origin: *");
if(isset($_GET)){
    if(isset($_GET['action']) && $_GET['action']=='getSettings'){
        $settingDirectory = 'settings';
        $settingFiles = array_diff(scandir($settingDirectory,1), array('..', '.'));
        $totalFiles = count($settingFiles);
        $randomFile = rand(0,$totalFiles-1);
        $settingFile = $settingFiles[$randomFile];
        $settingData = file_get_contents($settingDirectory.'/'.$settingFile);
        $settinFileName = explode('.',$settingFile)[0];
        $settingMode = substr($settinFileName,-1,1);
        echo json_encode( compact('settingData','settingMode'));
        exit; 
    }
   exit;
}