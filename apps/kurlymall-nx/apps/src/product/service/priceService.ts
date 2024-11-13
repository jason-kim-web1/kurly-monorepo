interface Param {
  retailPrice: number | null;
  basePrice: number;
  discountedPrice: number | null;
}

export class PriceService {
  private readonly retailPrice: number | null;

  private readonly basePrice: number;

  private readonly discountedPrice: number | null;

  constructor(param: Param) {
    this.retailPrice = param.retailPrice;
    this.basePrice = param.basePrice;
    this.discountedPrice = param.discountedPrice;
  }

  // 대표가
  get representativePrice(): number {
    if (this.discountedPrice === null) {
      return this.basePrice;
    }

    return this.discountedPrice;
  }

  // 컬리 판매가
  get kurlyPrice(): number | null {
    if (this.discountedPrice === 0) {
      return this.basePrice;
    }

    if (!this.discountedPrice) {
      return null;
    }

    if (this.discountedPrice === this.basePrice) {
      return null;
    }

    if (this.basePrice === this.retailPrice) {
      return this.basePrice;
    }

    return this.basePrice;
  }

  // 원가
  get originalPrice(): number | null {
    if (this.basePrice === this.retailPrice) {
      return null;
    }

    if (this.discountedPrice === this.retailPrice) {
      return null;
    }

    return this.retailPrice;
  }
}

interface GetSubPrice {
  originalPrice: number | null;
  kurlyPrice: number | null;
}

export function getSubPrice({ originalPrice, kurlyPrice }: GetSubPrice) {
  if (!!originalPrice && !!kurlyPrice) {
    return originalPrice >= kurlyPrice ? originalPrice : kurlyPrice;
  }

  if (!kurlyPrice) {
    return originalPrice;
  }

  return kurlyPrice;
}
