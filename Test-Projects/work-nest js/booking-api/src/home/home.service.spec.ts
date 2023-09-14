import { Test, TestingModule } from '@nestjs/testing';
import { HomeService, homeSelect } from './home.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const getMockHome = [
  {
    id: 8,
    address: 'aaaa',
    bathRooms: 3,
    city: 'aaaa',
    listDate: '2023-07-06T04:27:41.108Z',
    price: 45000,
    raeltor_id: 5,
    images: [
      {
        url: 'src1',
      },
    ],
  },
];

describe('HomeService', () => {
  let service: HomeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: PrismaService,
          useValue: {
            home: {
              findMany: jest.fn().mockReturnValue([getMockHome]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('HomeService', () => {
    let service: HomeService;
    let prismaService: PrismaService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          HomeService,
          {
            provide: PrismaService,
            useValue: {
              home: {
                findMany: jest.fn().mockReturnValue([getMockHome]),
              },
            },
          },
        ],
      }).compile();

      service = module.get<HomeService>(HomeService);
      prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getHomes', () => {
      const filters = {
        city: 'Kadawatha',
        price: {
          gte: 1,
          lte: 1000000000,
        },
      };

      it('should call prisma home.findMany with corect params', async () => {
        const mockPrismaFindManyHome = jest.fn().mockReturnValue(getMockHome);

        jest
          .spyOn(prismaService.home, 'findMany')
          .mockImplementation(mockPrismaFindManyHome);

        await service.getHomes(filters);

        expect(mockPrismaFindManyHome).toBeCalledWith({
          select: {
            ...homeSelect,
            images: {
              select: {
                url: true,
              },
              take: 1,
            },
          },
          where: filters,
        });
      });
      it('should throw not found exception if not homes are found', async () => {
        const mockPrismaFindManyHome = jest.fn().mockReturnValue([]);

        jest
          .spyOn(prismaService.home, 'findMany')
          .mockImplementation(mockPrismaFindManyHome);

        await expect(service.getHomes(filters)).rejects.toThrowError(
          NotFoundException,
        );
      });
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
