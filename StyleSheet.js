import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1f38',
    },
    timer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: 50,
        fontFamily: 'Roboto_500Medium',
        letterSpacing: 2,
    },
    timerTextMilli: {
        fontSize: 40,
        fontFamily: 'Roboto_300Light',
        letterSpacing: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 20,
        marginHorizontal: 20,
        fontFamily: 'Montserrat_400Regular',
    },
    buttonBordered: {
        borderColor: '#ffe500',
        borderWidth: 1,
        borderRadius: 25
    },
    laps: {
        flex: 1,
        backgroundColor: '#2c314f',
        margin: 20,
        borderRadius: 25,
    },
    lap: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    lapText: {
        flex: 1,
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat_500Medium',
    },
    lapTime: {
        textAlign: 'right', alignSelf: 'stretch',
        fontFamily: 'Roboto_500Medium',
    },
    colorYellow: {
        color: '#ffe500',
    },
    colorGray: {
        color: '#777777',
    },
});