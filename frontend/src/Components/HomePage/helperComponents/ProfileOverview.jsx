import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ProfileOverview = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Badge color="success" overlap="circular" badgeContent="online">
            <Avatar
              alt="Remy Sharp"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgSFRUYGBgYGBgYGhkYGBgZGRkYHBgZGRgYGBkcIS4lHB4rHxgZJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQrJCs0NDQ0NjQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NP/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIDBAUGB//EADwQAAEDAgMFBgQEBQQDAQAAAAEAAhEDIQQSMQVBUWFxEyIygZGhBrHB8EJy0eEUM1Ky8SNigsIHc5Ik/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAKREAAgICAgIBAgYDAAAAAAAAAAECERIhAzFBURNxoQQiMmGBwTNDkf/aAAwDAQACEQMRAD8A9blRCtCcBeuzy0UQnCtLQllCWKK1IOKmGjin2Y4qWVJgyrCn2oUDT5pCnzU0aTZYXhIwo9nzR2amhbHASLU+zT7MqimQhHZqfZlTDFLLiU9mjs1oyKJYljEq7NPIrAxEJYoryoyqaRSwQyJQpSiVSFbmqBYrSEQlhopyoyq/KUoVyJRTlTyq2FLKmQooyoyrQGKQYpkXEzZUBq05EZUyGJRlQtHZoTIYlMJtCllRCWRIRCMqkFIBSy1ZVkTyq3KllSxRVCcKUISxQg1SDUJyoVBCEJwhRSmHpQjKg2SD0wVXCEFlkpFQlPMhbDKouBU5CRA4oRld0pVhaoli0ZpizJZ08ieRTQ2R7RHaFSyIyJofmFnR2iOzKBTKaH5g7RMPR2ZTyJobDOnKUIBULZKUJShaFgmknmWQOE1HMglCkkSoIQlkiUkpRKCwRKJRKAJSzJpIB5kZkkQg2PMUsxShOFolsWZKVKEQhdkUAqUIyoSiMoUsqMqCmRRKcIhAJEpwnCgFmKMxThEIXYw8qQq8lCEQmhbLO0HBLMOCjCIUFsnmCFCEILZKEQmiELQoRCcIQURhEJpwgojCIUkJYojCIUkQlloUIsnCeVLFCgIUsqUJZaFZFk4TAUsUIQnARlCMqlloMoSgJ5Ui0q2KCEWRBRCECAggJ5UZUsEYRCITSxQoShTkIsliiGVMNUlJLLRDKgNU0KWKFlTTlCliipCELVmaBCEJZaBCIQligSQmlihITSSwCEISwOUSkhLA0kJOcAJJgcTolglKJUGPDhLSCOIII9lJASzIzKKFNAcolJOEstBKJTyoypYoihOEQlihIU8oSLUsURQnCSWKBCEwUsUCFLMklihISQoUaEk0AITDU3W5oKIoVlJoOsIdSIUsUVoQhUUCEIQUJCEIAXDxNZjz2mZz48LADlaJIzFg3mDd3kujtPaLMPTdWqHutGguSdzQOJXxvZ+1XNxBqAwHudY94w4ktBiJ3eiU2E0ns+mY7GuazPTIDm8BY8iOu7qrKW2a7wwtoNaHR4nkkkxMNaLC9p4LFgWZpNRzQWgHK6QBvl+uXjBKNg7dZWxTqLGl7WMcRUFmCCAQBHOAd9+qi9GpJds9YhCAqZGiUOBGoUcynY6JSiUpRKpLHKJSBlIuCFJSiUgUILHKJUZTlBY0JIQDQkhARzhLOsX8RyR2xW8TGRuzJZ1iFZSFZMRkaxURnWM1UjXTEZG41d4Ue0KwnEo/iwmIyNxqH/CHVSdSsH8UNykyvKYjI29qjtFl7QJGqmIyNfaJ9oFj7RMPTEZEMdhm1Mstz5SSGkxc2nrr6rxm09u0sMWxhGB72do3I1jWkEkNDnEEkiBNvRdD4h23iBUGGwrO/YvqObLG2nKCbTvM9AJ05GD+FHYh4fi8S4QIhjNGyTAcQA0ST+HesSpdm45PSPPbT27XxIyuOSmL5GSGk8Xb3u5le9+AKLGYbOLl7i5x3SAO6OQkjqCqMV8LYRr6VFjSM7yGl73d5rGlzyd1+QF4XrcFs+jRYGMAaxsw1tgJJJ9yVxfNFHX4ZdEw9Y9oYosIaHta7VoJAJI3wSLD3VVXaIqS2hZmhqGcp4hgHj66ddFXTwlMDKW54vNQ5zPHvadBARqfKvS+5U4cT9v7HlfiWvtR73CnUJpywN/h302uJIE+B2ezpBmw32uvYbG7QUKQq5s4Y3PmMuzRfMd5VukR7Ie4gartCOKo4zlk7NOdBqLGGkyfdSLCNT6GVvRnZpzJ51jzuChUxYGphWjOVG7MjtOa5g2iN0+QUm42dRHOymJVJHR7QJhwXPbVB0MqWdMSWb86DUjesXaHiokq4jM6GdC52ZCmBMiov5KbBO+Fka7cDHyVjKr23B/Q+Srsioue4iyiaijWxgdq0B1rjeOirFUIrDasn2qT6pKGBp1UXsjQq2iNMMyihAVIMKTSN6rc8AEkgAXJOgHFYDXccQMrszCMplsiYc4ZHgdJn/OXJIqVnVzRoUy/iFUZCsa2fIfVUqJmuYj5qqpXDWucdGgnyAlJ4gws21nZaNQ2/lv/ALU0Ns5WCxWd06OcZg8eS7lHEDwutwK8NsvaDWPaXbnbtwMieYGYL0GHxQcTBPiPd4X3/ouUonrhLRr25hKjn0K9CC+k8S06QbZrcN44FdB7HvH+u8OG9jG5Gf8AIEku8zHJY6tYhrXN1Dm+mYAg8oJ9AnUrOd4iSkeNS20c+TkcdJ9m0VGAxmgdJjpGi006rJEPF4nQfNcZhE30WhtNhEhdHFI4KTZ0K5ymWva5snQzHVUMxBBAdcT5x1WJlMXOoHDistfEsZOZ0fM+Sqiug5Ps7GJxTR4XTy1P6LM3GO0ErhYnaYa3OGkicoOgJgmeioZ8QHLAEGR6b/otKOjDnvZ6Z2MeRlH0lUsDpObTeSV5LE7RqPcajXFonQGI09VF2KfV7r32tczlBkXMeauJMtnrH4imfC9s6aj3WMbXpZXd7wwNNRO7ivLVy1pLWOJaCYJAEg2PshjIIDrAib8OKuKojk7O87b4BysG+7j9FnobWrveHF5DG3OUW9Br5riAQS2ZjfC2ik9jO0DgxpygNzSXkXJgaATvRpBNnpXbeDIDml2neFpG8xxWap8SPc4BjGgT+I3P6Ll4Z+cgEiScomIM6zw1PqoOoBj3U3uMAgOj5TyUVdFd9ro6rviKp/R7H9UK/DbNY5jXBxuJ8QQs5xOmEvZ0Q3cpZiN6qDlIuSjKZYSCjKqVIO4pQskOqbXQqyEBCWTD4U5UCRwQEBY8S1wDspizoBI5wbFebwuEnENjEy3I+XMyMPeLCAwtEGYLvI8V33AEQQCDYg71iq49tEFrGMIgyBlaQZDbaAukxGq5cjS2zpHejqsZAAzSI1JvbiUnPHVcLA7Yc9wY5hEeJ7h2cSTlhhJndN10qldjdXN8ytxakrRl2i01IM79y5e365/h6n5fqJ9lDE7UaLNBJ4nTy3rlbXxTn0ntLokaAa3Fp8lujKezzjgZ4W9nN/c+i7uycWXuJPinvD/cAAVxCO4yqNAcjuV5bPqR5hWNxLqNbO24c0GOIIv7yubO6dM+g0bsHn8pWd+JY3xPjkLnyCl8OVn16TqxYxjGyG3LnOgd4iwAG6evBcHEUzmNNrZc1z5I1I19hJ804pJ2k+hzxap+zbU2s0GzTHE29EDbkeFvqbaH9lzKlPKA52pzS0/hgwPrfkqCzLZwgTNl20zzbRvrbYqOnKYBnQbuq5znnjPEzfy9EAA6kjQk74SqZQbXHPWPuVVRl2W4isXBotlEBrRe1pzfJUsAkxoCNRu3GPvVV5oPT/P1SJVojeyzEvBc4ts33iwk8yqtADx+n+VJrxe26OWp/ZNkFwBEg+19ZTodljGSJII4E7yIt5qJ8RzTNpBGg0g89Fox+KGYU2TkGU9XAd4qmqQXF2gJNpvrMn1WbNtLwSNSTmyjpHAb1Q98ui5PH2UXPI6KLjx3x68VURuzSxhJaA5rZi7jYaCTCTnuky8OOYgmTe/iE7llD4HQ/fVGeCeIMhKFnRpbQrNAAfYaRCFz5PH2Qs4r0XKXs+hSiUNfGmnMJOdewhQ0SmUnW19VCVNr9xUHZIFKVGqQ25NlnOKGoabiRum8T0QGlzwBJMdVmftFg4mdIBuszqhJzPA0JaDodwA46rC+rF7kxpmgdJgwIsgZ0am1gDAb6lcDH4J2V9V73AvBGUCQWF7d2urxf2WirjGsaXlrbHwiXSeILmgxb7lFLaD306tRzg1hpkwJDg8uZkzNB8J0ufWF558iekjrCPtnPwNNgGaXtyGznEtbuF2l3dN3br6LY+nzBEWLXBwOsRHT3XJFY1Qc+SGEGbZosdW67/ddWqWmHgANIBAkHrpvmTe63wN3TOfIl2J1MWgyTqo16fcIcO84d07hrM+cKJkq5+GdlaSbEnnFgfqPVeh/uc17SOLs7Fdk99Ko0ZHy17XgkNO4nLeOY4yqdpUHMLTl7gsxwcHtLZkNDxZ0SdQDB0Wvaga1wbUbnaQMr2GHtt4ZghwE6EWuAVJmz2OpubTLnF3ebLXMfa8FskPHNoC4vR6VtaPpmwcUyrh2QQ2WAZdIERYcF5r4kwL6Lu0F2PIBIsfCBB42bPqvO7J+JqtHLTc1paywzNhwHCdV7rC7Yw2JZ2dQjvbifdruPuvnwc/w89rTPocih+I49Pf9ninEmJNgI872++CrrGbjz5C37r0O0fht1LvtOenO6zhNm5txuRccVx8bXBhogACCAdTMk/vyX04ckZK47PlT4pQtS0ZifscpVfP59JVjSIvznpCr0XQ5si4kx1v6KMe5B+c/fNBdDrHUD6iPkujgMI17JLXEmIA4A+cbxdSUlFbCi5Okc1zrn5cU2u3D14LXjabWP0uBDryBG7qsgPsdB0KKVoONMA+LDrKU+cj7lHZm5t5/miFETppf6KgXGIP6b0Zo9rqTWFwgRIE9dZhRBsIvyP3zQUNrZnipuLYtwEu3+iztOrd37Jg6j7N9FAXU3CB+6FfRoNIBn5IS0XFntC6N6z1cTub6q2kySc+gkQbXi196w1HwYbccSOHBYTTNuLStmmlVEEucdDHWFSyq4mAYgE34cSlTpOdcaAbzv/VSrkNaWuGZ7jPQftdL2WtFD33k9+wi5AnfZVPrOM9PbWOSHOtbdHAeirmAQdZ9hx9VTDLsRiC7KJs0R56lZwARMkARNiZ9NyrJnf6onQOeWNmbmAbwTexCS1HRE7eyGMxz2OczuBogg5XDMDYAy0mbblfgmtfQrF4aC9gZZoblcXMfInxuhk+XmrNl7Cq4iSO0yTY1SMoE2ySO8IEwABpfevTs+HKbb1HvqkCwcW5W2A7rQLeu6V4ZN+T2Qg2eAwuDFN5YzO94ylkMIzEm4yiSY5Wsbr1uG+F6r2gvIpkC+YC41mA436xpuXqdm0GUwWMYGBxLjFySdSSbkrdyvB9UjOSdpmvhj5PJ4n4Rim7s6mapAyhzcrCZmHESRY7l4fG7Yexxp1abmPbZzZFj6e9xwX2B1OTeemix4/Y1DED/AFaLHxYEgBw5NcII9VuPNK9klwxrR8dxO0GvZku2SJ7oNhe1xvhdjZ7YaAKTSHbgxzmPI0JYJlwP4gRC7+2//HjC3NhXFjxfI9xc1w4B2rT1kfNeSp4nEYR2Sqyoz/a4uYD+Vws4dCVuU21aMQji9npn7JzjLWyBxBy5yC62mRgNhzJ8irNn/DVGoxpAfRdlZmyukOIaA4ljswaCb7j0SwG3MO9vey5jqLEk83u/YLtbPxQeA7MxrNWtY7NI4udoejZ6leaUpPs9UUu0VnZuLpMAw1dmYOBBewgWPIuHEeEarZidjYasAawaysRLnNIbmdFyDAa7Q7vRaaVVzrtiNLzx1jf7LQ5rHDI/K+blroPnlWYya60alTe1Z8sxGFLHvpi+QuvpIEweUx7rK1pJAjWbb4le6298OvzOxNKXAyXM/Fpq3+octeq8rgKFPOO2kNAIJEgzBg25xZfRhyKUbPmz4qkaMNs5hIiMzQM1wBuEmdLwntHaDQ3s6bu7PedoX7xE6Nn1WPH44OkNY1jRlhrdTBIlx1PFY2sMy7Th1g/NFHdyDlSpEn3M65gZ5Hd1Vb4F5vI/RWlpyg8wPlNvMKLMO55a0akgC9r8VtMxRT2pPO5TzDXdqL7wtGOwRpd0kFwLpINouLCORvyWdwGp0n2gH6K2mSmuyLjpumb+QSduPL9k2Rp971VO5CDcOWnrGimHAAO4SCI4yoik9wkNJmRMW1A19F3MHgm0qZq1wCS05Gka2ga7ri6kpUajFsxUsJUIBaBG65QujhtgY2oxr2tIa4AgExbpuQsZfujeL9M7lTEiRTiDJJFzIO7mLTqr9nbMfVPdYA0WzEwNZMHetmzaVN73VH0S0PkNLnkkgHujKDrc8V6MODGgNHIAfduq8cOWVM9cuO2eXxXw/WaIZlc2Z7ru9YWsYlcTGYWqyS9jmzeSDc9V9CFbWQZGp09Jvw3LnVNoVM+R1MZZnMH5hF4tAInXRb+drsz8N9Hisktc2CTI0vG6Dxstbtg4gsFQNBjVs94DzgG3BewZiSRDWDIbWFoi+6/oqMEyAYi5Jtpw66AJ88r0V8CrZ5RuwKhubuMWAMNni7QkcBK7GydhtY4VHuzvIMSSWNm1mn5wvRZAJJ1Npi8cyjLvIAiJ08tVmU5S7LHjjHpFIaR925XSGW83g3vF+fJJtEPfMEBu8OiTwAGvVSrU4tIBNjvtyXM6BnAsBNiLceSba4nKYmVlaCJgiJAk6m3vdaaTSNYM8PLX3VQNOGfaHft5cVKi5pki3Ij6SoEidJE6GPZN/eNiQQOd5G/9VbMkqsQC0EknUD7spOpiO80OG+RI8gkx9pOo+f0Q9zoJ3IDl4/YmGfZ2GpOtq5jJ1tz/AMrhYn4We0f/AJ67wPEKdQuczS4Dx32aby7zXp63eEls6a3848lYWmJPpwVB4Kph8VTMtpYnNvY1zXsJ4h2a3X1G5Ojt+rQqNp4mk6lnJOZ1wBwYWyHHSQDaZXu6RnvA/fRcP4t2R/E4V9Nol7O+z8zTcDmW5h5qKKemLa2jtYDadN7BkcHNjd9VwfiX4bFQGrRb39S0aP8AL+r5rzHwFXzjI7OSCQTPgbALHA63OYEX8IPFe5x+N7Gk9xmWNJmw0EyVxycJ0uz0YRnC/DPlz6YBLoMmL8NbgKtzjJETYnThH6q17w5/MyD6lJj8mZ4dDmm3Xfc6bl9RukfJouznI4imAA7umXSbEGJ0AMWvfkslCsWGN7rX3AGbeiuDnuBqS6WveXZH5mxDJcMtoN7m1kDDZ3uawiQM3+o4NLrDTNHFc+OSplktqjG6oXd8mZF+t/1UC/mFsx+CNMlssc2R3muaTpvAJjxQo4fZNZ5DmMc5rjEgW4G66qUWrT0Yxd0YwV3tgbB7UGq8kUxIAb4nkGIHAc13dk/BGXK6s8GCDlboeRPp6L0+KpspsOZzWCLExA4ZRx5LlPl8RO8OLzI8BjdtuL+wosYWSWNDRci4tvlaKWe5rEPqzmYyMwY7cXuHD+kJimxgJw7HZT4qrvG7c45j4G9IXEbjodIA8JEEnUzdxBubp3pIPW2zu1atZxLjVdJuYdA8ghYKXxTUpAU8s5eXnw5oWcJFyifQ8T/MH3+FyKJs47+9ff4jvTQvH5Pd4NNOzJFjGv8AyWZ/3/8AJQhJeCR8hs5xyG/H5FLD2iLd1n/ZCEj0hLtnROiwbS0H52f3BCFpmI9mqlqegWbE6u6j5IQqwizZv8tn/D5BWDxHoP7ChCpBVvw9T8ih/ib+b/qhCyiolgtfP6Kb9G/mP1QhCeSTTfyP9xSbv6n5lCFtEZRhvEfyD+0Kxu/qhCLovk8B/wCOx36v/sd812vjL+TU/K3+8IQvM/8AP/KPR/o/hngW+L1+ihV/H+b6NQhfXPj+Cqn4x+UfJdfEsBfTkAzEyJnqhC88/wBS+jOkev8Ah6Klhaf8Q0ZGxItlHJeprMDacNAAg2AjfyQhcV+lfQ9K8/U4GOrOjxHQbzzXmq9VzqjQ4lwDjAJJA8imhd4nKZ3/AIhYG4F2UAd5mgj8Q4L56zd1CELfF0Y5eyqrqUIQupyP/9k="
            />
          </Badge>
          <Typography variant="h5" fontWeight={500}>
            John Doe
          </Typography>
          <Stack direction="row" gap={3} sx={{display: {sm: "none", md: "flex"}}}>
            <StyledBox>
              <Typography>368</Typography>
              <Typography>Post</Typography>
            </StyledBox>
            <StyledBox>
              <Typography>184K</Typography>
              <Typography>Followers</Typography>
            </StyledBox>
            <StyledBox>
              <Typography>6M</Typography>
              <Typography>Following</Typography>
            </StyledBox>
          </Stack>
        </Box>
      ) : (
        <ButtonGroup
          variant="contained"
          aria-label="signup or signin"
          fullWidth
        >
          <Button color="secondary">SIGNUP</Button>
          <Button variant="outlined" color="secondary">
            SIGNIN
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default ProfileOverview;
