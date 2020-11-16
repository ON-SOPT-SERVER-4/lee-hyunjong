

```
[ResponseBody]
<JSON>
data:{
	pk : 조직pk(number)
	name : 조직(학교/학원)명 (string)
}
```



## 2.회원가입

```
[기관이름 찾기] / GET
<JSON>
keyword : 검색어(string)
```



```
[회원관리/회원가입] / POST
<JSON>
members:[
	name:이름(string)
	authority : 권한[학생:0,선생님:1](integer)
	@Nullable grade : 학년[학생일 경우에만] (number)
	@Nullable classroom : 반[학생일 경우에만] (number)
	@Nullable tag : 번호[학생일 경우에만] (number)
	organization : 기관이름(string)
	email : 이메일(string)
	password : 비밀번호(string)
	checkPassword : 비밀번호확인(string)
]
```

```
[ResponseBody]
status : 200(OK,success)
data:{
	list:[
	{
		pk : 플레이리스트pk(number)
		name : 플레이리스트이름(string)
		contents:[
			url : 컨텐츠url(유튜브 썸네일로 쓸 예정)(string)
			contentsPk : 컨텐츠pk(number)
			title : 컨텐츠제목(string)
			songinfo : 노래제목(string)
			problems : [단어(boolean),문장(boolean),더빙(boolean),문제(boolean)]
		]
	},{...},{...}
	]
}
```

```
<PathVariable>
keyword : 검색어(string)
```



## 3.