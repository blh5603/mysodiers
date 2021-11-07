<template>
	<view class="warehouse-details">
		<view class="warehouse-details__info">
			<view class="details__statics">
				<view class="avatar"><image src="/static/images/avatar.png" mode="widthFix" class="avatar-img"></image></view>
				<view class="details__staticas--right">
					<view>
						<view class="label">库存余额</view>
						<view class="num">12321 {{ unit }}</view>
					</view>
					<view>
						<view class="label">可用余额</view>
						<view class="num">12321 {{ unit }}</view>
					</view>
					<view>
						<view class="label">冻结数量</view>
						<view class="num">12321 {{ unit }}</view>
					</view>
				</view>
			</view>
			<view class="details__btn" v-if="type == 1">
				<view class="details__btn-tips">兑换拆弹钳子需要消耗{{ cicNum }}CIC，参与PK竞技场可获得福利奖励</view>
				<button type="default" style="margin: 0 0 0 auto !important;" @click="exchange()">兑换</button>
			</view>
			<view class="details__btn" v-else-if="!name && type == 2">
				<view class="details__btn-tips">完成拆弹可以获得拆弹奖励，拆弹需要消耗数量不等的钳子</view>
				<button type="default" style="margin: 0 0 0 auto !important;" @click="disposal()">拆弹</button>
			</view>
			<view class="details__btn" v-else>
				<button type="default" @click="changeCoin('recharge')">充值</button>
				<button type="default" @click="changeCoin('withdraw')">提取</button>
				<button type="default" @click="transfer()">划转</button>
			</view>
		</view>
		<view class="details__flows">
			<view class="details__flows_title">累计流水:</view>
			<view class="details__flows_list">
				<view class="details__flows_item" v-for="(item, index) in flowsData" :key="index">
					<image :src="flowImage" class="details__flows_item--image"></image>
					<view class="details__flows_item--right">
						<view class="flows_item--right_type">{{ item.name }}</view>
						<view class="flows_item--right_time">{{ item.time }}</view>
					</view>
					<view class="details__flows_num">{{ item.count }} {{ unit }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			flowImage: '',
			name: '',
			type: '',
			cicNum: 10,
			sequence: '',
			unit: '枚',
			flowsData: [
				{ id: 0, type: 0, name: '拆弹', time: '2021-11-06 17:00:00', count: -21 },
				{ id: 1, type: 1, name: '扫雷', time: '2021-11-06 17:00:00', count: 1212 },
				{ id: 2, type: 3, name: '扫雷', time: '2021-11-06 17:00:00', count: 1212 }
			]
		};
	},
	onLoad(options) {
		this.name = options.name;
		this.type = JSON.parse(options.params).type;
		this.setTitle(JSON.parse(options.params), options.name);
	},
	methods: {
		// 设置标题
		setTitle(data, name) {
			let title, sequence;
			this.flowImage = data.image;
			switch (data.type) {
				case 0:
					sequence = '';
					title = 'CIC-' + name;
					this.unit = 'CIC';
					break;
				case 1:
					sequence = '';
					title = '钳子';
					this.unit = '把';
					break;
				case 2:
					sequence = data.sequence;
					this.sequence = data.sequence;
					title = '炸弹';
					this.unit = '枚';
					break;
			}
			uni.setNavigationBarTitle({
				title: `${sequence}${title}`
			});
		},
		// TODO: 获取流水
		loadFlowsData() {},
		// 划转
		transfer() {
			uni.navigateTo({
				url: './transfer'
			});
		},
		// 拆弹
		disposal() {
			uni.navigateTo({
				url: './disposal?sequence=' + this.sequence
			});
		},
		// 兑换
		exchange() {
			uni.navigateTo({
				url: './exchange'
			});
		},
		// 充值、提取
		changeCoin(type) {
			uni.navigateTo({
				url: './recharge?type=' + type
			});
		}
	},
	onPullDownRefresh() {
		// TODO: 下拉刷新
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onReachBottom() {
		//阻止重复加载
		let timer = null
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => this.loadFlowsData(), 500);
	}
};
</script>

<style lang="scss" scoped>
page {
	width: 100%;
	min-height: 100%;
	background: linear-gradient(to bottom, #11739d, #126c9a, #0b5b8f);
}
.details__flows {
	padding: 32rpx;
	color: #ffffff;
	.details__flows_title {
		font-size: 32rpx;
		padding-bottom: 32rpx;
	}
	.details__flows_list {
		.details__flows_item {
			margin: 24rpx 0;
			border: 1px solid #2d76a2;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 32rpx;
			border-radius: 12rpx;
			.details__flows_item--image {
				border-radius: 50%;
				width: 100rpx;
				height: 100rpx;
				margin-right: 32rpx;
				background-color: #2d80a7;
			}
			.details__flows_item--right {
				flex: 1;
				.flows_item--right_type {
					font-size: 30rpx;
				}
				.flows_item--right_time {
					font-size: 24rpx;
					margin-top: 24rpx;
				}
			}
		}
	}
}
</style>
