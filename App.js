import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const API_URL = 'http://100.86.228.125:5000';

var current_username;

function LoginScreen({ navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onPressButton = () => {
    setIsPressed(!isPressed);
  
    // Send login request to back-end
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((data) => {
        console.log(data.access_token);
        current_username = username;
        navigation.navigate('Home');
      })
      .catch((error) => console.error(error));
  };

  const onPressRegister = () => {
    setIsPressed(!isPressed);
    navigation.navigate('Register');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Twamp Swamp Guide</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'white'}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'white'}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isPressed ? styles.buttonPressed : null]}
          onPress={onPressButton}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.section}>OR</Text>
        <TouchableOpacity
          style={[styles.button, isPressed ? styles.buttonPressed : null]}
          onPress={onPressRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

function RegisterScreen({ navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onPressButton = () => {
    setIsPressed(!isPressed);

    // Send registration request to back-end
    fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Account exists or empty input.');
      }
    })
      .then((data) => {
        console.log(data.access_token);
        navigation.navigate('Login');
      })
      .catch((error) => console.error(error));
  };

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'white'}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'white'}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isPressed ? styles.buttonPressed : null]}
          onPress={onPressButton}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogin} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Back</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

function HomeScreen({ navigation }) {
  const onPressCategories = () => {
    navigation.navigate('Categories');
  };
  const onPressFeed = () => {
    navigation.navigate('Feed');
  };
  const onPressSearch = () => {
    navigation.navigate('Search');
  };
  const onPressAccount = () => {
    navigation.navigate('Account');
  };
  const onPressNewPost = () => {
    navigation.navigate('NewPost');
  };
  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.linetitle} />
      <TouchableOpacity onPress={onPressFeed}>
        <Text style={styles.section}>Feed</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressCategories}>
        <Text style={styles.section}>Categories</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressSearch}>
        <Text style={styles.section}>Search</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressAccount}>
        <Text style={styles.section}>Account</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressNewPost} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressLogin} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function CategoriesScreen({ navigation }) {
  const onPressNewPost = () => {
    navigation.navigate('NewPost');
  };
  const onPressWM = () => {
    navigation.navigate('WM');
  };
  const onPressCW = () => {
    navigation.navigate('CW');
  };
  const onPressJC = () => {
    navigation.navigate('JC');
  };
  const onPressOW = () => {
    navigation.navigate('OW');
  };
  const onPressHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.linetitle} />
      <TouchableOpacity onPress={onPressWM}>
        <Text style={styles.section}>In W&M</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressCW}>
        <Text style={styles.section}>In Colonial Williamsburg</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressJC}>
        <Text style={styles.section}>In James City County</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressOW}>
        <Text style={styles.section}>Outside of WIlliamsburg</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressNewPost} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function FeedScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params?.newPost) {
      setPosts([...posts, route.params.newPost]);
    }
  }, [route.params?.newPost]);

  const onPressNewPost = () => {
    navigation.navigate('NewPost');
  };
  const onPressHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.containerTop}>
      <Text style={styles.title}>Feed</Text>
      <View style={styles.linetitle} />

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postBody}>{item.body}</Text>
            <Text style={styles.postBody}>Sent by: Brain</Text>
            <Text style={styles.postTimestamp}>{item.timestamp}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNewPost} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  const onPressNewPost = () => {
    navigation.navigate('NewPost');
  };
  const onPressHome = () => {
    navigation.navigate('Home');
  };

  const onSearch = () => {
    // Do something with the search query
    console.log('Searching for:', searchQuery);
  };

  const onTagSearch = () => {
    // Do something with the search query
    console.log('Searching for:', tagSearchQuery);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.linetitle} />
        <TextInput
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={'white'}
          placeholder="Search..."
          onSubmitEditing={onSearch}
        />
        <Text style={styles.section}>OR</Text>
        <TextInput
          style={styles.searchBar}
          value={tagSearchQuery}
          onChangeText={setTagSearchQuery}
          placeholderTextColor={'white'}
          placeholder="Search Tags..."
          onSubmitEditing={onTagSearch}
        />
        <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNewPost} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

function AccountScreen({ navigation, current_user }) {
  const onPressHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.containerTop}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.linetitle} />
      <Text style={styles.current_user}>Current User: {current_username}</Text>
      <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}
  
function NewPostScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onPressHome = () => {
    navigation.navigate('Home');
  };

  const onSubmit = async () => {
  const response = await fetch('http://100.86.228.125:5000/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body,
      username: current_username
    })
  });

  if (response.ok) {
    const post = await response.json();
    navigation.navigate('Feed', { newPost: post });
    setTitle("");
    setBody("");
  } else {
    console.log('Error creating post');
  }
};


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.containerTop}>
        <Text style={styles.title}>Create New Post</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'white'}
            placeholder="Title"
            onChangeText={setTitle}
            value={title}
          />
        </View>
        <View style={styles.inputContainerBody}>
          <TextInput
            style={[styles.input, { height: 500 }]}
            placeholderTextColor={'white'}
            placeholder="Body"
            onChangeText={setBody}
            value={body}
            multiline={true}
          />
        </View>
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

function WMScreen({ navigation }) {
  const onPressNewPost = () => {
    navigation.navigate('NewPost');
  };
  const onPressHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.containerTop}>
      <Text style={styles.title}>In William & Mary</Text>
      <View style={styles.linetitle} />
      <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNewPost} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function CWScreen({ navigation }) {
  const onPressNewPost = () => {
    navigation.navigate('NewPost');
  };
  const onPressHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.containerTop}>
      <Text style={styles.title}>In Colonial Williamsburg</Text>
      <View style={styles.linetitle} />
      <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNewPost} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function JCScreen({ navigation }) {
  const onPressNewPost = () => {
    navigation.navigate('NewPost');
  };
  const onPressHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.containerTop}>
      <Text style={styles.title}>In James City County</Text>
      <View style={styles.linetitle} />
      <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNewPost} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function OWScreen({ navigation }) {
  const onPressNewPost = () => {
    navigation.navigate('NewPost');
  };
  const onPressHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.containerTop}>
      <Text style={styles.title}>Outside of Williamsburg</Text>
      <View style={styles.linetitle} />
      <TouchableOpacity onPress={onPressHome} style={styles.addHomeButton}>
        <Text style={styles.goHome}>Go Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNewPost} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="NewPost" component={NewPostScreen} />
        <Stack.Screen name="WM" component={WMScreen} />
        <Stack.Screen name="CW" component={CWScreen} />
        <Stack.Screen name="JC" component={JCScreen} />
        <Stack.Screen name="OW" component={OWScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 100, 0, 50)', // Translucent dark green background
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 100, 0, 50)', // Translucent dark green background
    alignItems: 'center',
    justifyContent: 'top',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  inputContainerBody: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007700',
    padding: 10,
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: '#004400',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '80%',
    marginBottom: 10,
  },
  linetitle: {
    borderBottomWidth: 1,
    borderBottomColor: 'gold',
    width: '80%',
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'gold',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addHomeButton: {
    position: 'absolute',
    bottom: 20,
    right: 210,
    backgroundColor: 'gold',
    borderRadius: 20,
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goHome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    width: '90%',
    marginBottom: 16,
    marginTop: 10,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postBody: {
    fontSize: 16,
    marginBottom: 5,
  },
  postTimestamp: {
    fontSize: 14,
    color: '#777',
  },
});