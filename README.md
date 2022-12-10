<div align="center"> 
	
  ![33 SHINING SHINNING (1)](https://user-images.githubusercontent.com/102529765/206551305-d818754b-89ce-4f26-85b9-1bc4b6cc16ed.png)
	
	
<div />

A memorization system based on the Ebbinghaus Deterioration Theory.

 ### Technologies
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,express,postgres,prisma,nodejs,jest" />
  </a>
</p>

<br>	

	
<div align="start"> 

	
<div />
	
<br>

## 👩‍🔧 Working Flow

<div align="start"> 

1. User creates a login (name, email, password).

2. User logs in and receives a token.

3. User can create a note, grab them all, get notes that need to be reviewed today, review notes, delete notes and edit notes.


</div>

<br>

## 🚀 Routes

<div align="start"> 

  ### User Registration
  
  POST /sign-up
  
  Send a request body in this format:
  

```
{
    name: 'fulana',
    email: 'fulana@gmail.com',
    password: '123456',
    confirmPassword: '123456'
}
```
#### Request:

|body| type | description
|--|--|--|
| name | string | valid name  |
| email | string | valid email  |
| password | string |  at least 6 characters |
| confirmPassword | string |  equal to password  |

#### Response:

|code| description | 
|--|--|
| 422 | request body is invalid | 
| 409 | email already registred | 
| 201 | created | 

 
<div />

<div align="start"> 

  ### User Login
  
  POST /sign-in
  
  Send a request body in this format
  

```
{
    email: fulano@gmail.com,
    password: 123456
}
```

#### Request:

|body| type | description
|--|--|--|
| email | string | valid email  |
| password | string |  valid password |

#### Response:

|code| description | 
|--|--|
| 422 | request body is invalid | 
| 401 | email doesn't exist or password doesn't match | 
| 200 | ok, returns a token |

```
{
    token: jyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9ASASASADL;;
}
```
<div />

<div align="start"> 

  ### Note Creation</h2>
  
  POST /notes
  
  Send a Authorization Header with format Bearer Token, and  a Request Body in this format:
  

```
{
  "title": "How vaccines work",
  "content": "Vaccines differ from other medical drugs in two important ways..."
}
```

#### Request:

|body| type | description
|--|--|--|
| title | string | valid title  |
| content | string |  valid content |

#### Response:

|code| description | 
|--|--|
| 422 | request body is invalid | 
| 401 | invalid or non-existent token | 
| 201 | created | 



<div />
	
<div align="start"> 

  ### Note Edit</h2>
  
  PATCH /notes/:id
  
  Send a Authorization Header with format Bearer Token, param id and a Request Body in this format:
  

```
{
  "content": "Vaccines differ from other medical drugs in two important ways edited..."
}
```

#### Request:

|body| type | description
|--|--|--|
| content | string |  valid content |

|param| type | description
|--|--|--|
| id | number |  valid note id |

#### Response:

|code| description | 
|--|--|
| 422 | request body is invalid | 
| 401 | invalid or non-existent token | 
| 200 | edited | 
| 400 | param id is not a number |
| 404 | note not found |

<div />

<div align="start"> 

  ### Note Review</h2>
  
  PATCH /notes/:id/review
  
  Send a Authorization Header with format Bearer Token and param id

#### Request:

|param| type | description
|--|--|--|
| id | number |  id from note |

#### Response:

|code| description | 
|--|--|
| 401 | invalid or non-existent token | 
| 200 | reviesed | 
| 400 | param id is not a number |
| 404 | note id not found |

<div />


<div align="start"> 

  ### Note Delete</h2>
  
  DELETE /notes/:id
  
  Send a Authorization Header with format Bearer Token and param id

#### Request:

|param| type | description
|--|--|--|
| id | number |  id from note |

#### Response:

|code| description | 
|--|--|
| 401 | invalid or non-existent token | 
| 200 | deleted | 
| 400 | param id is not a number |
| 404 | note id not found |

<div />


<div align="start"> 
   
   ### Get All User Notes
   
  GET /notes
  
  Send a Authorization Header with format Bearer Token.
  
  #### Response:

|code| description | 
|--|--|
| 401 | invalid or non-existent token | 
| 200 | ok | 


  If statusCode is 200, the server will respond with an array in this format:
  

```
[
  {
    "id": 1,
    "title": "How do vaccines Work",
    "content": "Vaccines differ from other medical drugs in two important ways...",
    "date: "10/10/2022"
    "progress": "0/4"
  }
]
```


<div />

<div align="start"> 
  
  ### Get Today Notes  
 
  GET /notes/today
  
  Send a Authorization Header with format Bearer Token.
  
  #### Response:

|code| description | 
|--|--|
| 401 | invalid or non-existent token | 
| 200 | ok | 


  If statusCode is 200, the server will respond with an array in this format:
  
```
[
 {
    "id": 1,
    "title": "How do vaccines Work",
    "content": "Vaccines differ from other medical drugs in two important ways...",
 }
]
```
<div />



## 🏁 Running this project
	
Before starting, you will need to have the following tools installed on your machine: Docker.

Besides, it's good to have an editor to work with the code like VSCode.
	
```
	
# First, clone this repository.
$ git clone https://github.com/emilynakano/shining-back.git

# Acces this repository.
$ cd shining-back

	
```

	
