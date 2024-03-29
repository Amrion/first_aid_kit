export const regExp = {
    checkEmail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
    containsLetters: /^.*[a-zA-Z]+.*$/,
    minimum8Chars: /^.{8,}$/,
    containsNumbers: /^.*[0-9]+.*$/,
    checkUsername: /^(?!.*\.\.)(?!\.)(?!.*\.$)(?!\d+$)[a-zA-Z0-9А-Яа-я.]{1,30}$/,
    checkNameMed: /^(?!.*\.\.)(?!\.)(?!.*\.$)(?!\d+$)[a-zA-Z0-9А-Яа-я\s.]{1,30}$/,
    checkKolMed: /^(\d+){1,4}$/,
};

