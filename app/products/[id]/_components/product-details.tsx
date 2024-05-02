"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/formatcurrency";
import { calculateProductTotalPrice } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1);

  const handleDecreaseQuantityClick = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };
  return (
    <div className="relative -mt-5 rounded-t-3xl bg-white py-5">
      <div className="flex items-center gap-1.5 px-5">
        <div className="relative size-6 overflow-hidden rounded-full">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            objectFit="cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* Nome do produto */}
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      {/* preço do produto e quantidade */}
      <div className="flex justify-between px-5">
        {/* preço */}
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          {product.discountPercentage > 0 && (
            <span className="block text-xs text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        {/* Quantidade */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="border border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="block w-4 text-center">{quantity}</span>

          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* Dados da entrega */}
      <Card className="mx-5 mt-6 flex justify-around p-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.99508 6.28255C5.00121 5.60933 5.18206 4.94925 5.51993 4.36693C5.8578 3.7846 6.3411 3.30002 6.92251 2.96059C7.03823 2.86915 7.17567 2.80924 7.32143 2.78671C7.46718 2.76418 7.61628 2.77979 7.75421 2.83203C7.89214 2.88426 8.01417 2.97134 8.10844 3.08477C8.20271 3.1982 8.26601 3.3341 8.29213 3.47925C8.43443 3.8969 8.6066 4.3046 8.74463 4.72367C8.78143 4.84947 8.85082 4.96329 8.94578 5.05363C9.04075 5.14397 9.1579 5.20761 9.28538 5.23808C9.70801 5.35975 10.1306 5.47999 10.5511 5.60664C10.6064 5.61708 10.659 5.63844 10.7059 5.66948C10.7528 5.70051 10.793 5.7406 10.8242 5.78738C10.8554 5.83416 10.877 5.88669 10.8877 5.94191C10.8983 5.99713 10.8978 6.05392 10.8862 6.10895C10.8798 6.16834 10.8607 6.22566 10.8303 6.27703C10.7998 6.32841 10.7587 6.37264 10.7096 6.40677C10.6606 6.44089 10.6048 6.46411 10.546 6.47484C10.4873 6.48557 10.4269 6.48357 10.369 6.46898C9.94565 6.40992 9.52373 6.34375 9.10394 6.26264C8.78918 6.21546 8.4907 6.09208 8.23451 5.90322C7.97831 5.71436 7.77218 5.46574 7.63401 5.17902C7.56286 5.03672 7.47604 4.90083 7.38283 4.73861C7.05563 5.05745 6.83582 5.47025 6.75389 5.9197C6.70195 6.12603 6.75386 6.2242 6.95877 6.29464C7.56781 6.50311 8.17259 6.72581 8.77451 6.95492C8.8944 6.98373 9.00512 7.04228 9.09643 7.12515C9.18774 7.20801 9.25671 7.31254 9.29697 7.42909C9.33724 7.54563 9.34748 7.67044 9.32681 7.792C9.30613 7.91356 9.25517 8.02795 9.17864 8.12462C8.87696 8.62267 8.55397 9.1079 8.23451 9.59528C8.00825 9.94035 8.00398 9.9375 8.23451 10.2876C8.24874 10.3089 8.27363 10.331 8.27363 10.3523C8.27363 10.4669 8.30848 10.6177 8.25014 10.686C8.20722 10.7283 8.15508 10.7601 8.0978 10.7789C8.04052 10.7976 7.97966 10.8029 7.92001 10.7941C7.61301 10.7072 7.31251 10.5988 7.0207 10.4697C6.96394 10.4512 6.91208 10.4201 6.86892 10.3789C6.82577 10.3376 6.79243 10.2872 6.77139 10.2313C6.75035 10.1754 6.74215 10.1155 6.74737 10.0561C6.7526 9.9966 6.77112 9.93906 6.80157 9.88771C7.02498 9.35029 7.24906 8.81288 7.4739 8.27546C7.49239 8.23064 7.50593 8.18438 7.52514 8.13316C7.04915 7.99086 6.58385 7.85282 6.12351 7.70625C5.92091 7.65002 5.72575 7.56977 5.54221 7.46719C5.3486 7.3414 5.19451 7.16344 5.0977 6.95383C5.00089 6.74422 4.96532 6.51151 4.99508 6.28255Z"
                fill="#7E8392"
              />
              <path
                d="M3.90118 6.92706C3.48638 6.93204 3.07086 6.9228 2.65606 6.93133C2.48415 6.93506 2.31302 6.95579 2.14519 6.99324C1.79242 7.06777 1.46716 7.2385 1.20545 7.48652C0.94374 7.73454 0.755804 8.05018 0.662448 8.39845L0.513062 8.84598L0.42343 8.83529C0.291525 8.52804 0.242511 8.19157 0.28134 7.85946C0.320168 7.52736 0.445419 7.21125 0.644644 6.94271C0.244783 6.85662 0.0463098 6.66809 0.0391948 6.34365C0.0202216 5.50456 0.00744665 4.66523 0.000806019 3.82566C-0.00339611 3.74673 0.00886382 3.6678 0.0368498 3.59387C0.0648358 3.51995 0.107886 3.45266 0.163307 3.39631C0.218728 3.33995 0.285283 3.29575 0.358725 3.26653C0.432167 3.23731 0.51085 3.2237 0.58984 3.22658C1.46451 3.21851 2.33925 3.21851 3.21391 3.22658C3.38578 3.2265 3.55183 3.28865 3.68144 3.40152C3.81105 3.51439 3.89544 3.67035 3.91898 3.8406C4.07836 4.66973 4.23557 5.49981 4.39068 6.33084C4.41172 6.40378 4.41469 6.48075 4.39936 6.55511C4.38404 6.62947 4.35087 6.69897 4.3027 6.75765C4.25452 6.81633 4.19278 6.86241 4.12283 6.89193C4.05288 6.92144 3.97683 6.93349 3.90118 6.92706Z"
                fill="#7E8392"
              />
              <path
                d="M10.7331 7.71733C10.8648 7.65116 10.9181 7.58783 10.8619 7.44055C10.8219 7.32466 10.7914 7.20568 10.7709 7.0848C10.7324 6.89554 10.7965 6.76605 10.9388 6.72905C11.0946 6.68707 11.2184 6.77246 11.2703 6.96314C11.3173 7.13461 11.3592 7.30822 11.4076 7.49961C11.5806 7.48997 11.7541 7.48997 11.927 7.49961C12.3552 7.55252 12.7569 7.73524 13.0782 8.0232C13.3995 8.31116 13.625 8.69058 13.7243 9.11044C13.8227 9.5312 13.7906 9.97198 13.6323 10.374C13.4739 10.7761 13.1967 11.1203 12.8377 11.3609C12.4786 11.5983 12.0555 11.7202 11.6251 11.7101C11.1947 11.7001 10.7777 11.5586 10.4301 11.3047C10.1401 11.09 9.90981 10.8047 9.76116 10.476C9.61252 10.1473 9.55044 9.78596 9.58081 9.42645C9.61119 9.06694 9.733 8.72117 9.93469 8.42202C10.1364 8.12288 10.4112 7.88029 10.7331 7.71733ZM10.4891 10.0439C10.5996 10.3396 10.8162 10.5837 11.0967 10.7284C11.3773 10.873 11.7017 10.9081 12.0067 10.8266C12.3186 10.74 12.5859 10.538 12.7544 10.2616C12.9228 9.98515 12.9799 9.65501 12.9139 9.3381C12.8539 9.04339 12.6888 8.78053 12.4494 8.59847C12.21 8.4164 11.9126 8.32753 11.6126 8.34842C11.6688 8.56614 11.7193 8.78029 11.7833 8.98876C11.794 9.02505 11.8545 9.04996 11.9 9.07272C11.9739 9.10452 12.0402 9.15161 12.0946 9.21091C12.149 9.2702 12.1901 9.34035 12.2154 9.41673C12.2407 9.4931 12.2495 9.57396 12.2412 9.65398C12.233 9.73401 12.2078 9.81137 12.1675 9.88097C12.1292 9.94749 12.0779 10.0056 12.0166 10.0517C11.9553 10.0979 11.8853 10.1312 11.8108 10.1496C11.7362 10.168 11.6588 10.1712 11.583 10.1589C11.5073 10.1466 11.4348 10.1191 11.3699 10.0781C11.303 10.0339 11.246 9.97632 11.2024 9.90901C11.1588 9.84169 11.1297 9.76609 11.1168 9.68695C11.1039 9.6078 11.1075 9.52683 11.1274 9.44916C11.1474 9.37149 11.1832 9.2988 11.2326 9.23566C11.2693 9.17458 11.2831 9.10249 11.2717 9.03216C11.2369 8.84504 11.1828 8.66219 11.1294 8.46298C10.8446 8.59901 10.621 8.83666 10.5025 9.1292C10.384 9.42174 10.3793 9.74802 10.4891 10.0439Z"
                fill="#7E8392"
              />
              <path
                d="M3.12249 7.49376C3.39981 7.49015 3.67505 7.54191 3.93213 7.64599C4.18921 7.75007 4.42294 7.90438 4.61965 8.0999C4.81636 8.29542 4.97216 8.5282 5.0778 8.78464C5.18344 9.04109 5.23683 9.31603 5.23491 9.59337C5.23735 9.87057 5.18493 10.1455 5.08066 10.4024C4.9764 10.6592 4.82234 10.8929 4.62738 11.09C4.43242 11.2871 4.20044 11.4436 3.94472 11.5507C3.689 11.6577 3.41464 11.7131 3.13743 11.7136C2.86015 11.714 2.58559 11.6596 2.32944 11.5534C2.07329 11.4473 1.8406 11.2915 1.64487 11.0951C1.44913 10.8987 1.29417 10.6656 1.18889 10.409C1.08361 10.1525 1.03011 9.87776 1.03143 9.60049C1.0301 9.04405 1.24949 8.50979 1.64148 8.11486C2.03347 7.71993 2.56605 7.49658 3.12249 7.49376ZM3.13812 10.8719C3.47396 10.8682 3.79495 10.7327 4.03183 10.4946C4.26872 10.2565 4.40257 9.93491 4.4046 9.59906C4.40218 9.2626 4.26741 8.94062 4.02949 8.7027C3.79157 8.46478 3.46963 8.33005 3.13317 8.32763C2.9668 8.32827 2.80218 8.36187 2.64888 8.42653C2.49558 8.49119 2.35665 8.58561 2.24007 8.70431C2.12348 8.82301 2.03158 8.96363 1.96969 9.11807C1.90781 9.27251 1.87719 9.43767 1.87954 9.60403C1.87727 9.7702 1.9081 9.93517 1.9703 10.0893C2.0325 10.2434 2.12482 10.3835 2.2418 10.5016C2.35878 10.6196 2.49803 10.7132 2.65157 10.7768C2.80511 10.8403 2.96985 10.8727 3.13604 10.8719H3.13812Z"
                fill="#7E8392"
              />
              <path
                d="M10.5122 1.72907C10.0948 1.64882 9.68252 1.54357 9.27772 1.41388C9.01162 1.33491 8.86933 1.41887 8.90704 1.69351C8.94709 1.92655 8.99909 2.15737 9.06285 2.38507C9.07993 2.47385 9.12204 2.55594 9.18418 2.62161C9.24632 2.68728 9.32594 2.73384 9.41365 2.7558C9.7758 2.85256 10.1386 2.94648 10.5043 3.0283C10.6751 3.06601 10.7178 3.12364 10.609 3.26736C10.5413 3.37408 10.4416 3.45665 10.3242 3.5033C10.2067 3.54994 10.0775 3.55825 9.95509 3.52705C9.50926 3.42211 9.07152 3.28538 8.64522 3.11793C8.36533 3.00005 8.12926 2.7977 7.96994 2.53915C7.81062 2.28059 7.736 1.97875 7.75655 1.67574C7.78767 1.50032 7.8341 1.32795 7.89529 1.16062C8.01275 0.885718 8.21284 0.654161 8.46782 0.498111C8.72281 0.342061 9.02004 0.269256 9.31828 0.289752C9.63923 0.307095 9.94796 0.418544 10.206 0.610238C10.464 0.801932 10.6598 1.06535 10.769 1.36764C10.875 1.65793 10.8103 1.77674 10.5122 1.72907Z"
                fill="#7E8392"
              />
              <path
                d="M12.436 7.05049C12.2584 7.00236 12.087 6.93382 11.9251 6.84628C11.7909 6.77627 11.6788 6.67035 11.6013 6.54032C11.5237 6.41028 11.4839 6.26125 11.4861 6.10988C11.4846 5.8811 11.5539 5.65745 11.6845 5.46958C11.815 5.2817 12.0005 5.1388 12.2154 5.06044C12.263 5.02343 12.3186 4.99792 12.3777 4.98587C12.4368 4.97383 12.4979 4.97558 12.5562 4.991C12.6145 5.00642 12.6684 5.03508 12.7138 5.07477C12.7593 5.11445 12.795 5.1641 12.8181 5.21981C13.0062 5.5249 13.097 5.88002 13.0785 6.23796C13.0375 6.43948 12.9828 6.63797 12.9148 6.83206C12.9021 6.88082 12.8786 6.92613 12.8462 6.9647C12.8138 7.00327 12.7732 7.03413 12.7273 7.05505C12.6815 7.07597 12.6315 7.08641 12.5811 7.08562C12.5307 7.08483 12.4811 7.07283 12.436 7.05049Z"
                fill="#7E8392"
              />
              <path
                d="M9.20065 1.54068C9.23054 1.53144 9.32022 1.61183 9.3252 1.6595C9.33018 1.70717 9.27394 1.77406 9.21559 1.88718C9.13519 1.78259 9.05836 1.72566 9.06334 1.67372C9.06832 1.62178 9.14302 1.55491 9.20065 1.54068Z"
                fill="#7E8392"
              />
              <path
                d="M3.10384 9.02889C3.18197 9.02407 3.26028 9.03516 3.334 9.06148C3.40772 9.0878 3.47531 9.12879 3.53272 9.18201C3.59013 9.23522 3.63613 9.29955 3.66795 9.37107C3.69977 9.44258 3.71679 9.51981 3.71789 9.59808C3.71758 9.74976 3.65924 9.89559 3.55487 10.0057C3.45049 10.1157 3.30793 10.1817 3.15648 10.19C3.07971 10.1922 3.00324 10.1792 2.93153 10.1517C2.85981 10.1243 2.7943 10.0829 2.73863 10.03C2.68296 9.97712 2.63823 9.91374 2.60713 9.84352C2.57604 9.7733 2.55912 9.69763 2.55737 9.62085C2.55364 9.54593 2.56489 9.47101 2.59046 9.40049C2.61603 9.32997 2.65544 9.26527 2.70632 9.21015C2.7572 9.15503 2.81855 9.1106 2.8868 9.07948C2.95505 9.04836 3.02886 9.03116 3.10384 9.02889Z"
                fill="#7E8392"
              />
            </svg>
          </div>

          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <svg
              width="11"
              height="14"
              viewBox="0 0 11 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.93981 13.044C4.62709 13.0441 4.31516 13.0127 4.00874 12.9502C3.41786 12.8291 2.8566 12.593 2.35698 12.2551C1.6142 11.7536 1.03279 11.0475 0.683184 10.2224C0.564996 9.94292 0.474765 9.65247 0.413813 9.35525C0.288657 8.74085 0.288657 8.10751 0.413813 7.49311C0.534844 6.90223 0.771039 6.34097 1.10892 5.84135C1.61036 5.09857 2.31645 4.51715 3.14164 4.16755C3.42107 4.04936 3.71153 3.95913 4.00874 3.89818C4.62315 3.77302 5.25648 3.77302 5.87088 3.89818C6.46176 4.01921 7.02302 4.25541 7.52265 4.59329C8.26542 5.09472 8.84684 5.80082 9.19644 6.62601C9.31463 6.90544 9.40486 7.19589 9.46581 7.49311C9.58888 8.09772 9.59082 8.72074 9.4715 9.32611C9.36917 9.84681 9.17675 10.3456 8.90291 10.8002C8.49279 11.485 7.91205 12.0517 7.21743 12.445C6.5228 12.8383 5.73804 13.0447 4.93981 13.044ZM6.53116 6.25997C6.4563 6.25991 6.38217 6.27464 6.31301 6.3033C6.24386 6.33196 6.18104 6.374 6.12817 6.427L4.51337 8.03967C4.40639 8.14683 4.34637 8.2921 4.34651 8.44352C4.34664 8.59493 4.40692 8.7401 4.51408 8.84707C4.62124 8.95405 4.76651 9.01407 4.91793 9.01393C5.06934 9.0138 5.21451 8.95352 5.32148 8.84636L6.12817 8.03967L6.93486 7.23369C7.0155 7.15428 7.07061 7.05262 7.09313 6.94171C7.11565 6.8308 7.10457 6.71569 7.06129 6.61112C7.01801 6.50654 6.94451 6.41727 6.85019 6.35471C6.75588 6.29216 6.64504 6.25917 6.53187 6.25997H6.53116Z"
                fill="#7E8392"
              />
              <path
                d="M2.67847 1.56031C2.67847 1.40009 2.74212 1.24643 2.85541 1.13313C2.96871 1.01983 3.12237 0.956184 3.2826 0.956184L6.90738 0.956184C7.0676 0.956184 7.22126 1.01983 7.33456 1.13313C7.44786 1.24643 7.51151 1.40009 7.51151 1.56031C7.51151 1.72054 7.44786 1.8742 7.33456 1.9875C7.22126 2.10079 7.0676 2.16444 6.90738 2.16444H3.2826C3.12237 2.16444 2.96871 2.10079 2.85541 1.9875C2.74212 1.8742 2.67847 1.72054 2.67847 1.56031V1.56031Z"
                fill="#7E8392"
              />
              <path
                d="M8.87918 2.68858C8.99621 2.57155 9.15494 2.5058 9.32044 2.5058C9.48594 2.5058 9.64467 2.57155 9.7617 2.68858L10.5588 3.48565C10.6758 3.60268 10.7415 3.76141 10.7415 3.92691C10.7415 4.09241 10.6758 4.25114 10.5588 4.36817C10.4417 4.48519 10.283 4.55094 10.1175 4.55094C9.95201 4.55094 9.79329 4.48519 9.67626 4.36817L8.87918 3.57109C8.76216 3.45406 8.69641 3.29534 8.69641 3.12983C8.69641 2.96433 8.76216 2.80561 8.87918 2.68858Z"
                fill="#7E8392"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold">
            {product.restaurant.deliveryTimeMinutes}min
          </p>
        </div>
      </Card>

      <div className=" mt-6 px-5">
        <h3 className="mb-3 font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="pt-6">
        <h3 className="mb-3 px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
