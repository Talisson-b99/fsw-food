import Image from "next/image";

import { Restaurant } from "@prisma/client";

import { HeartIcon } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-xl object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute left-2 top-2 flex w-fit items-center gap-[2px]"
        >
          <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
              fill="#FFB100"
              stroke="#FFB100"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          5.0
        </Badge>

        <Button className="absolute right-2 top-2 size-7 rounded-full bg-white/20 p-0">
          <HeartIcon size={12} color="white" fill="white" />
        </Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.99508 6.28259C5.00121 5.60937 5.18206 4.94929 5.51993 4.36697C5.8578 3.78465 6.3411 3.30006 6.92251 2.96063C7.03823 2.86919 7.17567 2.80928 7.32143 2.78675C7.46718 2.76422 7.61628 2.77984 7.75421 2.83207C7.89214 2.8843 8.01417 2.97138 8.10844 3.08481C8.20271 3.19824 8.26601 3.33414 8.29213 3.47929C8.43443 3.89694 8.6066 4.30465 8.74463 4.72372C8.78143 4.84951 8.85082 4.96333 8.94578 5.05367C9.04075 5.14401 9.1579 5.20765 9.28538 5.23812C9.70801 5.35979 10.1306 5.48003 10.5511 5.60668C10.6064 5.61712 10.659 5.63848 10.7059 5.66952C10.7528 5.70055 10.793 5.74064 10.8242 5.78742C10.8554 5.8342 10.877 5.88673 10.8877 5.94195C10.8983 5.99717 10.8978 6.05396 10.8862 6.10899C10.8798 6.16838 10.8607 6.2257 10.8303 6.27707C10.7998 6.32845 10.7587 6.37269 10.7096 6.40681C10.6606 6.44093 10.6048 6.46415 10.546 6.47488C10.4873 6.48561 10.4269 6.48361 10.369 6.46902C9.94565 6.40996 9.52373 6.34379 9.10394 6.26268C8.78918 6.21551 8.4907 6.09212 8.23451 5.90326C7.97831 5.7144 7.77218 5.46579 7.63401 5.17906C7.56286 5.03676 7.47604 4.90088 7.38283 4.73866C7.05563 5.05749 6.83582 5.47029 6.75389 5.91974C6.70195 6.12607 6.75386 6.22425 6.95877 6.29468C7.56781 6.50315 8.17259 6.72586 8.77451 6.95496C8.8944 6.98377 9.00512 7.04232 9.09643 7.12519C9.18774 7.20806 9.25671 7.31258 9.29697 7.42913C9.33724 7.54567 9.34748 7.67048 9.32681 7.79204C9.30613 7.9136 9.25517 8.02799 9.17864 8.12467C8.87696 8.62271 8.55397 9.10794 8.23451 9.59532C8.00825 9.94039 8.00398 9.93754 8.23451 10.2876C8.24874 10.3089 8.27363 10.331 8.27363 10.3523C8.27363 10.4669 8.30848 10.6178 8.25014 10.6861C8.20722 10.7284 8.15508 10.7602 8.0978 10.7789C8.04052 10.7977 7.97966 10.8029 7.92001 10.7942C7.61301 10.7072 7.31251 10.5988 7.0207 10.4697C6.96394 10.4512 6.91208 10.4202 6.86892 10.3789C6.82577 10.3377 6.79243 10.2872 6.77139 10.2314C6.75035 10.1755 6.74215 10.1156 6.74737 10.0561C6.7526 9.99664 6.77112 9.93911 6.80157 9.88775C7.02498 9.35033 7.24906 8.81292 7.4739 8.27551C7.49239 8.23068 7.50593 8.18443 7.52514 8.1332C7.04915 7.9909 6.58385 7.85287 6.12351 7.7063C5.92091 7.65006 5.72575 7.56981 5.54221 7.46724C5.3486 7.34144 5.19451 7.16348 5.0977 6.95387C5.00089 6.74426 4.96532 6.51155 4.99508 6.28259Z"
                fill="#EA1D2C"
              />
              <path
                d="M3.90118 6.92705C3.48638 6.93203 3.07086 6.92279 2.65606 6.93133C2.48415 6.93505 2.31302 6.95579 2.14519 6.99323C1.79242 7.06776 1.46716 7.23849 1.20545 7.48651C0.94374 7.73453 0.755804 8.05017 0.662448 8.39844L0.513062 8.84597L0.42343 8.83529C0.291525 8.52804 0.242511 8.19156 0.28134 7.85945C0.320168 7.52735 0.445419 7.21124 0.644644 6.9427C0.244783 6.85661 0.0463098 6.66808 0.0391948 6.34364C0.0202216 5.50455 0.00744665 4.66522 0.000806019 3.82565C-0.00339611 3.74672 0.00886382 3.66779 0.0368498 3.59387C0.0648358 3.51995 0.107886 3.45266 0.163307 3.3963C0.218728 3.33994 0.285283 3.29574 0.358725 3.26652C0.432167 3.2373 0.51085 3.22369 0.58984 3.22657C1.46451 3.2185 2.33925 3.2185 3.21391 3.22657C3.38578 3.22649 3.55183 3.28864 3.68144 3.40151C3.81105 3.51438 3.89544 3.67035 3.91898 3.84059C4.07836 4.66972 4.23557 5.4998 4.39068 6.33083C4.41172 6.40378 4.41469 6.48075 4.39936 6.5551C4.38404 6.62946 4.35087 6.69897 4.3027 6.75764C4.25452 6.81632 4.19278 6.8624 4.12283 6.89192C4.05288 6.92143 3.97683 6.93348 3.90118 6.92705Z"
                fill="#EA1D2C"
              />
              <path
                d="M10.7331 7.71732C10.8648 7.65115 10.9181 7.58782 10.8619 7.44054C10.8219 7.32465 10.7914 7.20567 10.7709 7.08479C10.7324 6.89553 10.7965 6.76604 10.9388 6.72904C11.0946 6.68707 11.2184 6.77245 11.2703 6.96313C11.3173 7.1346 11.3592 7.30821 11.4076 7.4996C11.5806 7.48996 11.7541 7.48996 11.927 7.4996C12.3552 7.55252 12.7569 7.73523 13.0782 8.02319C13.3995 8.31115 13.625 8.69057 13.7243 9.11043C13.8227 9.53119 13.7906 9.97197 13.6323 10.374C13.4739 10.7761 13.1967 11.1203 12.8377 11.3609C12.4786 11.5983 12.0555 11.7202 11.6251 11.7101C11.1947 11.7001 10.7777 11.5586 10.4301 11.3047C10.1401 11.09 9.90981 10.8047 9.76116 10.476C9.61252 10.1472 9.55044 9.78596 9.58081 9.42645C9.61119 9.06693 9.733 8.72117 9.93469 8.42202C10.1364 8.12287 10.4112 7.88028 10.7331 7.71732ZM10.4891 10.0439C10.5996 10.3396 10.8162 10.5836 11.0967 10.7283C11.3773 10.873 11.7017 10.908 12.0067 10.8266C12.3186 10.74 12.5859 10.538 12.7544 10.2616C12.9228 9.98514 12.9799 9.655 12.9139 9.33809C12.8539 9.04338 12.6888 8.78053 12.4494 8.59846C12.21 8.41639 11.9126 8.32752 11.6126 8.34841C11.6688 8.56613 11.7193 8.78028 11.7833 8.98875C11.794 9.02504 11.8545 9.04995 11.9 9.07272C11.9739 9.10451 12.0402 9.1516 12.0946 9.2109C12.149 9.2702 12.1901 9.34034 12.2154 9.41672C12.2407 9.49309 12.2495 9.57395 12.2412 9.65398C12.233 9.734 12.2078 9.81136 12.1675 9.88097C12.1292 9.94748 12.0779 10.0056 12.0166 10.0517C11.9553 10.0979 11.8853 10.1312 11.8108 10.1496C11.7362 10.168 11.6588 10.1712 11.583 10.1589C11.5073 10.1466 11.4348 10.1191 11.3699 10.0781C11.303 10.0339 11.246 9.97631 11.2024 9.909C11.1588 9.84168 11.1297 9.76608 11.1168 9.68694C11.1039 9.60779 11.1075 9.52683 11.1274 9.44916C11.1474 9.37149 11.1832 9.29879 11.2326 9.23565C11.2693 9.17457 11.2831 9.10248 11.2717 9.03216C11.2369 8.84503 11.1828 8.66219 11.1294 8.46297C10.8446 8.599 10.621 8.83665 10.5025 9.12919C10.384 9.42174 10.3793 9.74801 10.4891 10.0439Z"
                fill="#EA1D2C"
              />
              <path
                d="M3.12252 7.49377C3.39984 7.49016 3.67508 7.54192 3.93216 7.646C4.18924 7.75008 4.42297 7.90439 4.61968 8.09991C4.81639 8.29543 4.97219 8.52821 5.07783 8.78466C5.18347 9.0411 5.23686 9.31604 5.23494 9.59338C5.23739 9.87058 5.18496 10.1455 5.08069 10.4024C4.97643 10.6592 4.82237 10.8929 4.62741 11.09C4.43245 11.2871 4.20047 11.4436 3.94475 11.5507C3.68903 11.6577 3.41467 11.7131 3.13746 11.7136C2.86018 11.714 2.58562 11.6596 2.32947 11.5534C2.07332 11.4473 1.84063 11.2915 1.6449 11.0951C1.44916 10.8987 1.29421 10.6656 1.18892 10.4091C1.08364 10.1526 1.03014 9.87778 1.03146 9.60051C1.03013 9.04407 1.24952 8.5098 1.64151 8.11487C2.0335 7.71994 2.56608 7.49659 3.12252 7.49377ZM3.13815 10.8719C3.47399 10.8682 3.79498 10.7327 4.03186 10.4946C4.26875 10.2565 4.4026 9.93492 4.40463 9.59907C4.40221 9.26261 4.26744 8.94063 4.02952 8.70271C3.7916 8.46479 3.46966 8.33006 3.1332 8.32764C2.96683 8.32828 2.80221 8.36189 2.64891 8.42654C2.49561 8.4912 2.35668 8.58562 2.2401 8.70432C2.12351 8.82302 2.03161 8.96365 1.96972 9.11808C1.90784 9.27252 1.87722 9.43769 1.87957 9.60404C1.8773 9.77021 1.90813 9.93518 1.97033 10.0893C2.03253 10.2434 2.12485 10.3836 2.24183 10.5016C2.35881 10.6196 2.49806 10.7132 2.6516 10.7768C2.80514 10.8404 2.96988 10.8727 3.13607 10.8719H3.13815Z"
                fill="#EA1D2C"
              />
              <path
                d="M10.5122 1.72909C10.0947 1.64884 9.68249 1.54359 9.27769 1.4139C9.01159 1.33492 8.8693 1.41888 8.90701 1.69352C8.94706 1.92656 8.99906 2.15738 9.06282 2.38508C9.0799 2.47387 9.12201 2.55596 9.18415 2.62163C9.24629 2.6873 9.32591 2.73386 9.41362 2.75581C9.77577 2.85258 10.1386 2.94649 10.5043 3.02831C10.6751 3.06602 10.7178 3.12365 10.6089 3.26738C10.5413 3.37409 10.4416 3.45667 10.3241 3.50331C10.2067 3.54995 10.0775 3.55827 9.95506 3.52706C9.50923 3.42212 9.07149 3.2854 8.64519 3.11795C8.3653 3.00007 8.12923 2.79772 7.96991 2.53916C7.81059 2.2806 7.73597 1.97876 7.75651 1.67576C7.78764 1.50033 7.83407 1.32797 7.89526 1.16064C8.01272 0.885734 8.21281 0.654176 8.46779 0.498127C8.72278 0.342077 9.02001 0.269271 9.31825 0.289767C9.6392 0.307111 9.94793 0.418559 10.2059 0.610253C10.4639 0.801947 10.6598 1.06536 10.769 1.36765C10.875 1.65794 10.8103 1.77676 10.5122 1.72909Z"
                fill="#EA1D2C"
              />
              <path
                d="M12.436 7.05048C12.2584 7.00235 12.087 6.93381 11.9252 6.84627C11.7909 6.77626 11.6788 6.67034 11.6013 6.54031C11.5238 6.41027 11.4839 6.26124 11.4862 6.10987C11.4847 5.88108 11.5539 5.65744 11.6845 5.46957C11.8151 5.28169 12.0005 5.13879 12.2154 5.06043C12.2631 5.02342 12.3186 4.9979 12.3777 4.98586C12.4368 4.97382 12.4979 4.97557 12.5562 4.99099C12.6145 5.00641 12.6685 5.03507 12.7139 5.07476C12.7593 5.11444 12.795 5.16409 12.8181 5.2198C13.0062 5.52489 13.097 5.88 13.0785 6.23795C13.0375 6.43947 12.9828 6.63796 12.9149 6.83204C12.9021 6.88081 12.8787 6.92612 12.8462 6.96469C12.8138 7.00326 12.7732 7.03412 12.7273 7.05504C12.6815 7.07595 12.6316 7.0864 12.5812 7.08561C12.5308 7.08482 12.4812 7.07282 12.436 7.05048Z"
                fill="#EA1D2C"
              />
              <path
                d="M9.20065 1.54071C9.23054 1.53146 9.32022 1.61186 9.3252 1.65953C9.33018 1.7072 9.27394 1.77408 9.21559 1.88721C9.13519 1.78262 9.05836 1.72569 9.06334 1.67375C9.06832 1.62181 9.14302 1.55494 9.20065 1.54071Z"
                fill="#EA1D2C"
              />
              <path
                d="M3.10381 9.02893C3.18194 9.02411 3.26025 9.0352 3.33397 9.06152C3.40769 9.08784 3.47528 9.12884 3.53269 9.18205C3.5901 9.23527 3.6361 9.29959 3.66792 9.37111C3.69974 9.44262 3.71676 9.51985 3.71786 9.59812C3.71755 9.7498 3.65921 9.89563 3.55484 10.0057C3.45046 10.1158 3.3079 10.1817 3.15645 10.1901C3.07968 10.1923 3.00321 10.1792 2.9315 10.1518C2.85978 10.1243 2.79427 10.083 2.7386 10.0301C2.68292 9.97716 2.6382 9.91378 2.6071 9.84356C2.57601 9.77335 2.55909 9.69767 2.55734 9.6209C2.55361 9.54597 2.56486 9.47105 2.59043 9.40053C2.616 9.33001 2.65541 9.26531 2.70629 9.21019C2.75717 9.15507 2.81852 9.11065 2.88677 9.07952C2.95502 9.0484 3.02883 9.0312 3.10381 9.02893Z"
                fill="#EA1D2C"
              />
            </svg>
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.40008 13.044C5.08736 13.0441 4.77542 13.0127 4.46901 12.9502C3.87813 12.8292 3.31687 12.593 2.81725 12.2551C2.07447 11.7536 1.49305 11.0476 1.14345 10.2224C1.02526 9.94293 0.935031 9.65248 0.87408 9.35526C0.748923 8.74085 0.748923 8.10752 0.87408 7.49312C0.99511 6.90224 1.2313 6.34098 1.56918 5.84135C2.07062 5.09858 2.77671 4.51716 3.6019 4.16756C3.88134 4.04937 4.17179 3.95914 4.46901 3.89819C5.08341 3.77303 5.71674 3.77303 6.33115 3.89819C6.92203 4.01922 7.48329 4.25541 7.98291 4.59329C8.72569 5.09473 9.30711 5.80082 9.65671 6.62601C9.7749 6.90545 9.86513 7.1959 9.92608 7.49312C10.0491 8.09773 10.0511 8.72075 9.93177 9.32612C9.82943 9.84681 9.63702 10.3457 9.36317 10.8002C8.95305 11.485 8.37232 12.0517 7.67769 12.445C6.98307 12.8383 6.19831 13.0447 5.40008 13.044ZM6.99143 6.25998C6.91657 6.25992 6.84243 6.27465 6.77328 6.30331C6.70412 6.33197 6.64131 6.37401 6.58844 6.42701L4.97363 8.03968C4.86666 8.14684 4.80664 8.29211 4.80677 8.44352C4.8069 8.59494 4.86718 8.74011 4.97435 8.84708C5.08151 8.95405 5.22678 9.01408 5.37819 9.01394C5.52961 9.01381 5.67477 8.95353 5.78175 8.84637L6.58844 8.03968L7.39513 7.2337C7.47577 7.15429 7.53088 7.05262 7.5534 6.94171C7.57592 6.8308 7.56483 6.7157 7.52155 6.61112C7.47828 6.50655 7.40477 6.41727 7.31046 6.35472C7.21615 6.29216 7.10531 6.25918 6.99214 6.25998H6.99143Z"
                fill="#EA1D2C"
              />
              <path
                d="M3.13873 1.56036C3.13873 1.40013 3.20238 1.24647 3.31568 1.13318C3.42897 1.01988 3.58264 0.95623 3.74286 0.95623L7.36764 0.95623C7.52787 0.95623 7.68153 1.01988 7.79483 1.13318C7.90812 1.24647 7.97177 1.40013 7.97177 1.56036C7.97177 1.72059 7.90812 1.87425 7.79483 1.98754C7.68153 2.10084 7.52787 2.16449 7.36764 2.16449H3.74286C3.58264 2.16449 3.42897 2.10084 3.31568 1.98754C3.20238 1.87425 3.13873 1.72059 3.13873 1.56036V1.56036Z"
                fill="#EA1D2C"
              />
              <path
                d="M9.33945 2.68863C9.45648 2.5716 9.6152 2.50585 9.78071 2.50585C9.94621 2.50585 10.1049 2.5716 10.222 2.68863L11.019 3.4857C11.1361 3.60273 11.2018 3.76146 11.2018 3.92696C11.2018 4.09246 11.1361 4.25119 11.019 4.36821C10.902 4.48524 10.7433 4.55099 10.5778 4.55099C10.4123 4.55099 10.2536 4.48524 10.1365 4.36821L9.33945 3.57114C9.22242 3.45411 9.15668 3.29539 9.15668 3.12988C9.15668 2.96438 9.22242 2.80565 9.33945 2.68863Z"
                fill="#EA1D2C"
              />
            </svg>
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes}min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
