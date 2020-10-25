import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#14171A',
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#1a7a7d',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#34F4F9',
        width: 100,
        alignItems: "center",
        justifyContent: 'center',
        marginTop:'5%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginTop:'15%'
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    heading:{
        color:'#FFF',
        fontSize:20,
        marginTop:'15%',
        fontWeight:'bold',
    },
    what:{
        color:'#FFF',
        fontSize:20,
        marginTop:'5%',
        fontWeight:'normal',
    },
    manual:{
        color:'#FFF',
        fontSize:20,
        marginTop:'30%',
        fontWeight:'normal',
    },
    back:{
        position:'absolute',
        top:20,
        left:20,
    },
    next:{
        position:'absolute',
        bottom:30,
        right:20
    }
})
