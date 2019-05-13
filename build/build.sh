#!/bin/bash

status=`git status | grep -E "Your branch is ahead of|Changes not staged for commit|Untracked files|Changes to be committed"`
_last_commit=`git log -1 --pretty='%s%b' | awk -F ' ' '{ print $1 }'`
_changes= `git status -s`
_length=`git status -s | grep -c " "`
currentStatus=`git status`


strA=`git status`
str1="Your branch is ahead of"
str2="Changes not staged for commit"
str3="Untracked files"
str4="Changes to be committed"
result1=$(echo $strA | grep "${str1}")
result2=$(echo $strA | grep "${str2}")
result3=$(echo $strA | grep "${str3}")
result4=$(echo $strA | grep "${str4}")

# 如果改动的文件只是ym-web-newmanage.tar.gz，则忽略，可直接打包
if [[ "${result1}" = "" &&  "${result3}" = "" && "${result4}" = "" &&  "${result2}" != '' && "${_length}" = 1 && "${currentStatus}" =~ 'ym-web-newmanage.tar.gz' ]];
	then
	status=''
fi

# 格式化add的ym-web-newmanage.tar.gz的message信息
if [[  "${_last_commit}" =~ "TG-16-" ]];
	then
		_new_commit="$_last_commit add ym-web-newmanage.tar.gz for dev deploy"
else
		_new_commit="merge add ym-web-newmanage.tar.gz for dev deploy"
fi

# 如果代码都已提交，可打包并上传，否则提示错误并退出
if [[ $status != "" ]];
	then
		message=`git -c color.status=always status | less -REX`
		echo -e "\033[33m You have files changed but not pushed to remote repository, please check and try again: \033[0m \n"		
		echo "$message"
		exit 0
else
  echo -e "\033[32m build start : $(date) \033[0m"
	vue-cli-service build
  echo -e "\033[32m build completed : $(date) \033[0m"
	tar -zcf ym-web-newmanage.tar.gz output
	rm -rf output 
  echo -e "\033[32m upload start : $(date) \033[0m"
	git add ym-web-newmanage.tar.gz -f
  git commit -m "$_new_commit"
  git push
  echo -e "\033[32m upload completed : $(date) \033[0m"
	rm -rf ym-web-newmanage.tar.gz
fi
