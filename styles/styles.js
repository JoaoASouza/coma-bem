import { StyleSheet } from 'react-native'
import colorPallete from './colorPallete';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({

	alert: {
		color: "#f00"
	},

	button: {
		flexDirection: 'row', 
        backgroundColor: colorPallete.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:3,
		margin: 10,
	},

	buttonText: {
		color: 'white',
		marginHorizontal: 10,
		marginVertical: 10,
	},

	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},

    form: {
        justifyContent: 'center'
    },

	formItem: {
		fontSize: 16,
		marginBottom: 20
	},

	mainTitle: {
		fontSize: 25,
		marginBottom: 10
	},

	menuItem: {
		backgroundColor:colorPallete.primaryColor,
		width: Dimensions.get('window').width,
		marginTop: 3,
	},

    radio: {
        width: 150,
    },

	row: {
		
		flexDirection: 'row',
		width:250,
		backgroundColor: 'white',
		marginTop: 10,
	},

	rowTitle: {
		color: 'gray',
		textAlign: 'left',
		flex: 1
	},

	rowContent: {
		color: 'gray',
		textAlign: 'right',
		flex: 1
	},

	searchBar: {
		flexDirection: 'row',
		marginTop: 50,
		margin: 10
	},

	paragraph: {
		margin: 10,
	},

    picker: {
        width: 200,
        height: 100,
    }
	
});

export default styles